import express, { Request, Response, NextFunction } from "express";
//import { CreateUserDto, CreateAuthDataDto, AuthEmailDto, LoginUserDto } from "./dto";
import * as adminService from "../services/admin.service";
import { findReport, findUsers, updateUser } from "../services/admin.service";
import { updateProject } from "../services";
import resumeRoute from "./resume.routes";
import userRoute from "./user.routes";
//import { createIndiUser, findOneUser } from "../db/user.repo";
//import { avatarImg, tokenValidator, validateBody } from "../middlewares";
export const adminRoute = express();

// 2-1. 전체 회원 목록 조회
adminRoute.get("/users", async (req, res, next) => {
  try {
    const count = Number(req.query.count);
    const pages = Number(req.query.pages);
    const offset = count * pages - count;

    const users = await adminService.findUsers(count, offset);

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
  const userId = Number(req.params.userId);
  try {
    const worstUsers = await adminService.findReport(userId);

    return res.status(200).json({
      msg: "신고 내역 조회 성공",
      data: worstUsers,
    });
  } catch (err) {
    next(err);
  }
});

// 3-1. 포인트 / 비활성화 수정
adminRoute.patch("/users/:userId", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const updateInfo = req.body;
    const count = Number(req.query.count);
    const pages = Number(req.query.pages);
    const offset = count * pages - count;

    const updatedUser = await adminService.updateUser(userId, updateInfo, count, offset);

    return res.status(203).json({
      msg: "회원 정보 변경 성공",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

// 3-2. 2주 밴
adminRoute.patch("/worst-users/:userId/ban", async (req, res, next) => {
  const userId = Number(req.params.userId);
  const type = req.body.type.toUpperCase();
  const typeEnum = ["BAN", "RECOVERY"];
  let msg = "";

  if (type === "RECOVERY") {
    msg = "복구";
  }

  if (typeEnum.includes(type) === false) {
    next(new Error(`400, 제대로된 타입 입력 부탁합니다.`));
  }

  try {
    const bannedUser = await adminService.banUser(userId, type);

    return res.status(200).json({
      msg: `회원 2주 밴 ${msg} 처리 성공`,
      data: { expire: bannedUser },
    });
  } catch (err) {
    next(err);
  }
});
