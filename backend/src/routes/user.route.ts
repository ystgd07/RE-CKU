import bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import { join, sendEmail } from "../services";
import { validateBody } from "../middlewares/dto-validator";
import { CreateUserDto, CreateAuthDataDto } from "./dto";
import { random, send } from "../config/sendMail";
const userRoute = express();
userRoute.post("/email", validateBody(CreateAuthDataDto), async (req, res, next) => {
  const toEmail = req.body.email;
  // 내용에 들어갈 랜덤 수
  const number = random(111111, 999999);

  try {
    await sendEmail(toEmail, number);
    // 실제로 보내는 함수
    return res.status(203).json({
      msg: "전송완료",
      data: number,
    });
  } catch (err) {
    next(err);
  }
});

userRoute.post("/individual", validateBody(CreateUserDto), async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, phoneNumber, password } = req.body;
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
    const success = await join(data);
    return res.status(201).json({
      status: 201,
      msg: "가입 완료 &_&",
      data: success,
    });
  } catch (err) {
    next(err);
  }
});

export default userRoute;
