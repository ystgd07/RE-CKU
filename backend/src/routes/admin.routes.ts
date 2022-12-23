import express, { Request, Response, NextFunction } from "express";
//import { CreateUserDto, CreateAuthDataDto, AuthEmailDto, LoginUserDto } from "./dto";
import * as adminService from "../services/admin.service";
import {findUsers, updateUser} from "../services/admin.service";
import {updateProject} from "../services";
import resumeRoute from "./resume.routes";
import userRoute from "./user.routes";
//import { createIndiUser, findOneUser } from "../db/user.repo";
//import { avatarImg, tokenValidator, validateBody } from "../middlewares";
export const adminRoute = express();

// 2-1. 전체 회원 목록 조회
adminRoute.get("/users", async (req, res, next) => {
  try {
    const users = await adminService.findUsers();

    return res.status(200).json({
      msg: "회원 목록 조회 성공",
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

// 2-2. 신고 TOP 20 회원 목록 조회
adminRoute.get("/worst-users", async (req, res, next) => {
  try {
    const worstUsers = await adminService.findWorstUsers();

    return res.status(200).json({
      msg: "최악의 회원 목록 조회 성공",
      data: worstUsers,
    });
  } catch (err) {
    next(err);
  }
});

// 2-3. 신고 내역 조회
adminRoute.get("/worst-users/:userId", async (req, res, next) => {
  try {
    const worstUsers = await adminService.findWorstUsers();

    return res.status(200).json({
      msg: "최악의 회원 목록 조회 성공",
      data: worstUsers,
    });
  } catch (err) {
    next(err);
  }
});

// 3-1. 포인트 수정
adminRoute.patch("/users/:userId/point", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const point = req.body;

    const updatedUser = await adminService.updateUser(userId, point);

    return res.status(203).json({
      msg: "포인트 변경 성공",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

// 3-2. 비활성화 해제
adminRoute.patch("/users/:userId/active", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    const updatedUser = await adminService.updateUser(userId, {"active": 1});

    return res.status(203).json({
      msg: "비활성화 해제 성공",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

// 3-3. 비활성화
adminRoute.patch("/worst-users/:userId", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    const updatedUser = await adminService.updateUser(userId, {"active": 0});

    return res.status(203).json({
      msg: "비활성화 성공",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

// 밴
adminRoute.patch("/ban", async (req, res, next) => {
  const type = req.body.type.toUpperCase();
  const targetId = req.body.targetId;
  const typeEnum = ["BAN", "RECOVERY"];
  if (typeEnum.includes(type) === false) {
    next(new Error(`400, 제대로된 타입입력 부탁합니다.`));
  }
  try {
    const date = await adminService.banUser(targetId, type);
    return res.status(200).json({
      msg: "회원 벤",
      data: { expire: date },
    });
  } catch (err) {
    next(err);
  }
});

/*
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
  if (req.body.password === null) {
    next(new Error("400, 비밀번호를 입력해주세요."));
  }
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
    const update = await userService.updateInfo(id, toUpdate, currentPw);
    return res.status(200).json({
      msg: "회원정보가 수정되었습니다.",
    });
  } catch (err) {
    next(err);
  }
});

userRoute.patch("/sign-out", tokenValidator, async (req, res, next) => {
  const userId = Number(req.body.jwtDecoded.id);
  try {
    const result = userService.updateInfo;
    return res.status(200).json({
      msg: "로그아웃 성공",
      data: "로그아웃 성공",
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
*/