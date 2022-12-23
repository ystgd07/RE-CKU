//import bcrypt from "bcrypt";
//import { dataSource, updateUser } from "../db";
import * as adminRepo from "../db/admin.repo";
//import * as authRepo from "../db/auth.repo";
//import { CreateUserDto } from "../routes/dto";
//import jwt from "jsonwebtoken";
//import { send } from "../config/sendMail";
import { EmailAuth, UserProfile } from "../db/schemas";
import {findUsersQ, updateUserQ} from "../db/admin.repo";

// 2-1. 전체 회원 목록 조회
export const findUsers = async () => {
  const users = await adminRepo.findUsersQ();

  return users;
};

// 2-2. 최악의 전체 회원 목록 조회
export const findWorstUsers = async () => {
  const worstUsers = await adminRepo.findWorstUsersQ();

  return worstUsers;
};

// 3. 포인트 / 비활성화
export const updateUser = async (userId: number, updateInfo: Record<string, string | number>) => {
  const updatedUser = updateUserQ(userId, updateInfo);

  return updatedUser;
}

// admin 유저 벤하기 / 회생시키기
export const banUser = async (userId: number, type: string): Promise<Date> => {
  const data = {
    ban: Date.now() + 1209600000,
  };

  try {
    if (type === "BAN") {
      await adminRepo.banUserQ(userId, data);

      return new Date(Date.now() + 1209600000);
    }

    data.ban = Date.now();

    await adminRepo.updateUserQ(userId, data);

    return new Date(Date.now());
  } catch (err) {
    console.log(err.message);
    throw new Error(`500, 서버오류`);
  }
};