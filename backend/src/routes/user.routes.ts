import bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { CreateUserDto, CreateAuthDataDto, AuthEmailDto, LoginUserDto } from "./dto";
import { random } from "../config/sendMail";
import { createIndiUser, findOneUser } from "../db/user.repo";
import { avatarImg, tokenValidator, validateBody } from "../middlewares";
export const userRoute = express();

userRoute.get("/individuals", tokenValidator, async (req, res, next) => {
  const { id } = req.body.jwtDecoded;
  console.log(id);
  try {
    const user = await userService.individualInfo(id);
    return res.status(200).json({
      msg: "회원정보",
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

// 개인 회원가입 라우트
userRoute.post("/individuals", validateBody(CreateUserDto), async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, phoneNumber, password } = req.body;
  console.log(req.body);
  console.log("들어옴?");
  // hash 화 된 비번
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    username,
    email,
    phoneNumber,
    password: hashedPassword,
  };
  try {
    const success = await userService.join(data);
    return res.status(201).json({
      msg: "가입 완료 &_&",
      data: success,
    });
  } catch (err) {
    next(err);
  }
});

// 로그인 라우트
userRoute.post("/", validateBody(LoginUserDto), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const success = await userService.login(email, password);
    return res.status(200).json({
      msg: "로그인 성공",
      accessToken: success.accessToken,
      refreshToken: success.refreshToken,
      userId: success.userId,
    });
  } catch (err) {
    next(err);
  }
});

// 개인정보 수정 라우트
userRoute.patch("/individuals", tokenValidator, avatarImg.single("image"), async (req, res, next) => {
  const id = Number(req.body.jwtDecoded.id);
  const currentPw = req.body.currentPw;
  if (!currentPw) next(new Error("400, 기존 비밀번호를 입력하세요."));
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  let avatarUrl = "";
  if (req.file) {
    avatarUrl = req.file.path;
  }
  console.log("아바타 유알엘", avatarUrl);
  // const avatarUrl = req.body.avatarUrl;
  const toUpdate = {
    ...(password && { password }),
    ...(phoneNumber && { phoneNumber }),
    // ...(avatarUrl && { avatarUrl }),
  };
  console.log(toUpdate);
  try {
    const update = await userService.updateInfo(id, currentPw, toUpdate);
    return res.status(200).json({
      msg: "회원정보가 수정되었습니다.",
    });
  } catch (err) {
    next(err);
  }
});

// 회원가입시 인증번호 보내는 라우트
userRoute.post("/email", validateBody(CreateAuthDataDto), async (req, res, next) => {
  const toEmail = req.body.email;
  // 내용에 들어갈 랜덤 수
  const number = random(111111, 999999);

  try {
    await userService.sendEmail(toEmail, number);
    // 실제로 보내는 함수
    return res.status(200).json({
      msg: "전송완료 4분이내 인증을 완료해주세요.",
      data: number,
    });
  } catch (err) {
    next(err);
  }
});

// 회원가입시 이메일 인증하는 라우트
userRoute.post("/email/auth", validateBody(AuthEmailDto), async (req, res, next) => {
  try {
    const { email, code } = req.body;
    await userService.authEmail(email, code);
    return res.status(200).json({
      msg: `인증 완료`,
    });
  } catch (err) {
    next(err);
  }
});

// 임시 비번 보내기 라우트
userRoute.post("/eamil/password", validateBody(CreateAuthDataDto), async (req, res, next) => {
  const { email } = req.body;
  try {
    const newPassword = await userService.findPassword(email);
    return res.status(200).json({
      msg: `임시 비밀번호가 ${email}로 발송되었습니다.`,
      data: newPassword, // 배포시 수정 -삭제
    });
  } catch (err) {
    next(err);
  }
});

export default userRoute;
//
