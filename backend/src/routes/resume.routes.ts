import bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import { validateBody } from "../middlewares/dto-validator";
import { CreateUserDto, CreateAuthDataDto, AuthEmailDto, LoginUserDto } from "./dto/index.dto";
import { authEmail, join, login, sendEmail } from "../services/index.service";
import { createIndiUser, findOneUser } from "../db/resume.repo";
//import { random } from "../config/sendMail";

const resumeRoute = express();

// 1. 내 이력서 목록 조회
resumeRoute.get("/myportfolio/list", async (req: Request, res: Response, next: NextFunction) => { // validateBody(CreateUserDto),
    const { id } = req.body;

    // hash 화 된 비번
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const data = {
    //     username,
    //     email,
    //     phoneNumber,
    //     password: hashedPassword,
    // };

    try {
        const success = await join(id);
        return res.status(200).json({
            status: 200,
            msg: "내 이력서 목록 조회 성공",
            data: success,
        });
    } catch (err) {
        next(err);
    }
});

/*
// 로그인 서비스
// 비밀
userRoute.post("/", validateBody(LoginUserDto), async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const success = await login(email, password);
        return res.status(200).json({
            status: 200,
            msg: "로그인 성공",
            accessToken: success.accessToken,
            refreshToken: success.refreshToken,
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
        await sendEmail(toEmail, number);
        // 실제로 보내는 함수
        return res.status(200).json({
            status: 200,
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
        await authEmail(email, code);
        return res.status(200).json({
            status: 200,
            msg: `인증 완료`,
        });
    } catch (err) {
        next(err);
    }
});
userRoute.post("/zz", async (req, res, next) => {
    const data = req.body;
    const zz = await createIndiUser(data);
    console.log(zz);
    return res.json({
        data: zz,
    });
}); */

export default resumeRoute;
