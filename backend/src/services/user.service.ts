import bcrypt from "bcrypt";
import { dataSource, updateUser } from "../db/index.schema";
import { createIndiUser, findOneAuthData, findOneUser, createAuthData, updateAuthData } from "../db/index.schema";
import { CreateUserDto } from "../routes/dto/index.dto";
import jwt from "jsonwebtoken";
import { send } from "../config/sendMail";
import { EmailAuth } from "../db/schemas/index.schema";

// 회원가입 서비스
export const join = async (data: CreateUserDto): Promise<Object> => {
  // 우선 인증을 완료했는지 검증,
  const statusVerify = await findOneAuthData(data.email);
  if (!statusVerify) throw Error(`404, [${data.email}] 해당 이메일로 진행된 인증절차가 없습니다.`);
  if (statusVerify.verify === false && !statusVerify)
    throw Error(`404, [${data.email}] 해당 이메일에 대한 인증 내역을 확인할 수 없습니다.`);

  // 이미 가입한 회원이지 확인,
  const overlapUser = await findOneUser(data.email);
  if (overlapUser) throw Error("400, 이미 가입한 회원입니다.");

  // 검증끝났으면 만들어!
  const newUser = await createIndiUser(data);
  return newUser;
};

// 로그인 서비스
export const login = async (email: string, password: string) => {
  // 가입한 이메일 있는지 확인
  const user = await findOneUser(email);
  if (!user) throw Error(`404, ${email}로 가입한 회원이 없습니다.`);

  // 비밀번호 일치하는지 확인
  const existence = user.password;
  const comparePw = await bcrypt.compare(password, existence);
  if (!comparePw) throw Error(`400, 비밀번호가 일치하지 않습니다.`);

  // 로그인시작 - JWT 발급해야함
  // accessToken 은 10분, refreshToken 은 하루동안 유효
  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      type: "AT",
    },
    process.env.JWT_SECRET_KEY || "secret",
    { expiresIn: 60 * 60 * 24 } // 수정해야함
  );
  const refreshToken = jwt.sign(
    {
      type: "RT",
    },
    process.env.JWT_SECRET_KEY || "secret",
    { expiresIn: 60 * 60 * 24 }
  );

  // 옵젝으로 묶어서 리턴
  const result = {
    accessToken,
    refreshToken,
  };
  return result;
};

// 정보수정 서비스
export const updateInfo = async (id: number, currentPw: string, data: Record<string, string>): Promise<boolean> => {
  // 비밀번호 일치 여부
  const user = await findOneUser(id);
  if (!user) throw Error("404, 유저정보를 찾을 수 없습니다. 관리자에게 문의하세요.");
  const existence = user.password;
  const comparePw = await bcrypt.compare(currentPw, existence);
  if (!comparePw) throw Error(`400, 비밀번호를 확인해 주세요.`);
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  console.log(data.password);
  try {
    await updateUser(id, data);
  } catch (err) {
    throw Error("500, 서버 오류");
  }

  return true;
};

// 임시 비밀번호 보내기 서비스
export const findPassword = async (email: string): Promise<boolean | string> => {
  const user = await findOneUser(email);

  if (!user) throw Error(`404, ${email}로 가입한 유저는 없습니다.`);
  const randomStr = Math.random().toString(36).substring(2, 12);
  const hashedPassword = await bcrypt.hash(randomStr, 10);
  const data = { password: hashedPassword };
  try {
    await updateUser(user.id, data);
  } catch (err) {
    throw Error("500, 서버에 오류가 생겼습니다.");
  }

  const mailInfo = {
    from: "jinytree1403@naver.com",
    to: email,
    subject: "[헤드헌터] 비밀번호 발송 ",
    text: `      
    헤드헌터 ${email} 
    
    임시 비밀번호 :  ${randomStr}
    
    빠른 시일 내로 비밀번호를 변경하시길 바랍니다.
    `,
  };
  //발송
  // 아래 try/catch 문은 배포시 삭제해야함. 네이버로그인이 안되는것에 대한 오류를 잡은것.
  try {
    send(mailInfo);
    return randomStr;
  } catch (err) {
    return true;
  }
};

// 회원가입시 이메일 인증 부분
export const sendEmail = async (toEmail: string, number?: number) => {
  const overlap = await findOneAuthData(toEmail);
  // 인증 시도한 적이 없다면 생성
  if (!overlap) {
    await createAuthData(toEmail, number);
  } else {
    // 재시도라면 업데이트
    await updateAuthData(toEmail, number);
  }
  // 이메일 내용
  const mailInfo = {
    from: "jinytree1403@naver.com",
    to: toEmail,
    subject: "[헤드헌터] 인증번호 발송 ",
    text: `      
    헤드헌터 회원가입 인증번호
    
    인증번호 입력란에 ${number} 를 입력해주세요.`,
  };
  //발송
  // 아래 try/catch 문은 배포시 삭제해야함. 네이버로그인이 안되는것에 대한 오류를 잡은것.
  try {
    send(mailInfo);
    return;
  } catch (err) {
    return;
  }
};

export const authEmail = async (email: string, code: number) => {
  // 우선 해당하는 이메일 찾아서
  const statusVerify = await findOneAuthData(email);
  if (!statusVerify) throw Error(`404, [${email}] 해당 이메일로 인증번호가 보내지지 않았습니다.`);
  if (statusVerify.code !== code) throw Error(`400, 입력된 코드가 올바르지 않습니다.`);
  // 4분안에 인증했을 경우
  if (statusVerify.time.getTime() + 300000 - Date.now() <= 0)
    throw Error(`400, 인증시간이 지났습니다. 인증번호를 재발급 해주세요.`);
  statusVerify.verify = true;
  await dataSource.getRepository(EmailAuth).save(statusVerify);
  return;
  // 이메일의 verify 상태가 false? 그럼 에러
};
