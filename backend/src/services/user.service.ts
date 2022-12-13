import { createIndiUser, findOneAuthData, findOneUser, createAuthData, updateAuthData } from "../db";
import { CreateUserDto } from "../routes/dto/";
import jwt from "jsonwebtoken";
import { send } from "../config/sendMail";

// export const login = async (params: any) => {};

export const join = async (data: CreateUserDto): Promise<Object> => {
  const overlapUser = await findOneUser(data.email);
  if (overlapUser) throw Error("400, 이미 가입한 회원입니다.");
  const newUser = await createIndiUser(data);
  return newUser;
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
  send(mailInfo);

  return;
};
