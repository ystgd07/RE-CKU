//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

//import { CreateUserDto } from "../routes/dto/index.dto";
// import { dataSource, updateUser } from "../db/index.schema";
// import { createIndiUser, findOneAuthData, findOneUser, createAuthData, updateAuthData } from "../db/index.schema";
// import { send } from "../config/sendMail";
// import { EmailAuth } from "../db/schemas/index.schema";
import { createResumeQ, findResumeListQ, createDetailQ, findDetailQ, updateResumeQ } from "../db/index.schema";

// 1. 이력서 생성
export const createResume = async (id: number, newName: string): Promise<Object> => {
  const newResume = await createResumeQ(id, newName);

  return newResume;
};

// 2-2. 내 이력서 목록 조회
export const findResumeList = async (data: any): Promise<Object> => {
  const myResumeList = await findResumeListQ(data);

  return myResumeList;
};

// 통합
// 1. (업무경험 / 프로젝트) 생성
export const createDetail = async (resumeId: number, createInfo: Record<string, string | number | boolean>, dbname: string): Promise<Object> => {
  const newDetail = await createDetailQ(resumeId, createInfo, dbname);

  return newDetail;
};

// 2. 조회
export const findDetail = async (detailId: number, dbname: string, type: string): Promise<Object> => {
  const details = await findDetailQ(detailId, dbname, type);

  return details;
};

// 3. 수정
export const updateResume = async (resumeId: number, updateInfo: Record<string, string | number>, dbname: string) => {
  const updatedResume = await updateResumeQ(resumeId, updateInfo, dbname);

  return updatedResume;
};

/*
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
        { expiresIn: 60 * 10 }
    );
    const refreshToken = jwt.sign(
        {
            id: user.id,
            role: user.role,
            type: "RT",
        },
        process.env.JWT_SECRET_KEY || "secret",
        { expiresIn: 60 * 60 * 24 }
    );
    const data = {
        phoneNumber: undefined,
        password: undefined,
        role: undefined,
        RT: refreshToken,
        active: undefined,
    };
    await updateUser(user.id, data);
    // 옵젝으로 묶어서 리턴
    const result = {
        accessToken,
        refreshToken,
    };
    return result;
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
}; */
