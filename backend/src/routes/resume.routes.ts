import bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import { validateBody } from "../middlewares/dto-validator";
import {tokenValidator} from "../middlewares/verify-JWT"
import { CreateUserDto, CreateAuthDataDto, AuthEmailDto, LoginUserDto } from "./dto/index.dto";
import {
    indiInfo,
    createResume,
    findResumeList,
    createDetail,
    findDetail,
    updateResume
} from "../services/index.service";
import {isNumber} from "class-validator";
import {updateNotice} from "../services/board.service";
import boardRoute from "./board.routes";
//import { findResumeList } from "../db/resume.repo";
//import { random } from "../config/sendMail";

const resumeRoute = express();

// 1. 이력서 (틀) 생성
resumeRoute.post("/resume", tokenValidator, async (req, res, next) => {
    const userId = req.body.jwtDecoded.id;
    const userInfo = await indiInfo(userId);

    let resumeNameNum = [];

    try {
        const myResumeList = await findResumeList(userId);

        for (let i=0; i<myResumeList[0].length; i++) {
            const spl = myResumeList[0][i].name.split(" ");

            if (spl.length == 2 && spl[0] == userInfo.username && isNumber(Number(spl[1]))) {
                resumeNameNum.push(Number(spl[1]));
            }

        }

        const newName = `${userInfo.username} ${Math.max(...resumeNameNum) + 1}`

        const newResume = await createResume(userId, newName);

        return res.json({
            status: 201,
            msg: "이력서 생성 성공",
            data: newResume,
        });
    } catch (err) {
        next(err);
    }
})

// 2-2. 내 이력서 목록 조회
resumeRoute.get("/list", tokenValidator, async (req: Request, res: Response, next: NextFunction) => { // validateBody(CreateUserDto),
    const userId = req.body.jwtDecoded.id;

    try {
        const success = await findResumeList(userId);

        return res.status(200).json({
            status: 200,
            msg: "내 이력서 목록 조회 성공",
            data: success[0],
        });
    } catch (err) {
        next(err);
    }
});

// 2-3. 이력서 상세 조회
resumeRoute.get("/resume/:resumeId", tokenValidator, async (req: Request, res: Response, next: NextFunction) => { // validateBody(CreateUserDto),
    const resumeId = Number(req.params.resumeId);

    try {
        // const resumes = await findResume(resumeId);
        const resumes = await findDetail(resumeId, "resume", "all");
        const careers = await findDetail(resumeId, "career", "all");
        const projects = await findDetail(resumeId, "project", "all");

        return res.json({
            status: 200,
            msg: "이력서 상세 정보 조회",
            resumeData: resumes[0],
            careerData: careers[0],
            projectData: projects[0]
        });
    } catch (err) {
        next(err);
    }
});

// 3. 이력서 (기본 정보) 수정
resumeRoute.patch("/resume/:resumeId", async (req, res, next) => {
    const resumeId = Number(req.params.resumeId);
    const updateInfo = req.body

    try {
        const updatedResume = await updateResume(resumeId, updateInfo, "resume");

        return res.json({
            status: 203,
            msg: "이력서 수정 성공",
            data: updatedResume
        });
    } catch (err) {
        next(err);
    }
});

// 업무경험
// 1. 업무경험 생성
resumeRoute.post("/resume/career/:resumeId", async (req, res, next) => {
    const resumeId = Number(req.params.resumeId);
    const careerInfo = req.body

    try {
        const newCareer = await createDetail(resumeId, careerInfo, "career");

        return res.json({
            status: 201,
            msg: "업무경험 생성 성공",
            data: newCareer
        });
    } catch (err) {
        next(err);
    }
})

// 2. 업무경험 조회 (하나)
resumeRoute.get("/resume/career/:careerId", async (req, res, next) => {
    const careerId = Number(req.params.careerId);

    try {
        const careers = await findDetail(careerId, "career", "one");

        return res.json({
            status: 200,
            msg: "이력서 업무경험 조회 성공",
            data: careers[0]
        });
    } catch (err) {
        next(err);
    }
})

// 3. 업무경험 수정
resumeRoute.patch("/resume/career/:careerId", async (req, res, next) => {
    const careerId = Number(req.params.careerId);
    const updateInfo = req.body

    try {
        const updatedResume = await updateResume(careerId, updateInfo, "career");

        return res.json({
            status: 203,
            msg: "이력서 업무경험 수정 성공",
            data: updatedResume
        });
    } catch (err) {
        next(err);
    }
});

// 프로젝트
// 1. 프로젝트 생성
resumeRoute.post("/resume/project/:resumeId", async (req, res, next) => {
    const resumeId = Number(req.params.resumeId);
    const projectInfo = req.body

    try {
        const newProject = await createDetail(resumeId, projectInfo, "project");

        return res.json({
            status: 201,
            msg: "이력서 프로젝트 생성 성공",
            data: newProject
        });
    } catch (err) {
        next(err);
    }
})

// 2. 프로젝트 조회 (하나)
resumeRoute.get("/resume/project/:projectId", async (req, res, next) => {
    const projectId = Number(req.params.projectId);

    try {
        const projects = await findDetail(projectId, "project", "one");

        return res.json({
            status: 200,
            msg: "이력서 프로젝트 조회 성공",
            data: projects[0]
        });
    } catch (err) {
        next(err);
    }
})

// 3. 프로젝트 수정
resumeRoute.patch("/resume/project/:projectId", async (req, res, next) => {
    const projectId = Number(req.params.projectId);
    const updateInfo = req.body

    try {
        const updatedResume = await updateResume(projectId, updateInfo, "project");

        return res.json({
            status: 203,
            msg: "이력서 프로젝트 수정 성공",
            data: updatedResume
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
