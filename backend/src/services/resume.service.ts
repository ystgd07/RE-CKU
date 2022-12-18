//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

//import { CreateUserDto } from "../routes/dto/index.dto";
// import { dataSource, updateUser } from "../db/index.schema";
// import { createIndiUser, findOneAuthData, findOneUser, createAuthData, updateAuthData } from "../db/index.schema";
// import { send } from "../config/sendMail";
// import { EmailAuth } from "../db/schemas/index.schema";
<<<<<<< HEAD
import { createResumeQ, findResumeListQ, createDetailQ, findDetailQ, updateResumeQ, deleteResumeQ } from "../db";
=======
import {
  findOneUser,
  createResumeQ,
  findResumeListQ,
  createDetailQ,
  findDetailQ,
  updateResumeQ,
  deleteResumeQ,
} from "../db/index.repo";
import {indiInfo} from "./user.service";
import * as repository from "../db/index.repo";
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969

// 1. 이력서 생성
export const createResume = async (userId: number): Promise<Object> => {
  // create default resume name
  let defaultResumeNameNums = [];
  let newResumeName = "";

  const userInfo = await findOneUser(userId, "비번빼고");
  const myResumeList = await findResumeList(userId);

  for (let i=0; i<myResumeList[0].length; i++) {
    const resumeNames = myResumeList[0][i].name.split(" ");

    if (resumeNames.length == 2 && resumeNames[0] == userInfo.username && isNumber(Number(resumeNames[1]))) {
      defaultResumeNameNums.push(Number(resumeNames[1]));
    }
  }

  if (defaultResumeNameNums.length == 0) {
    newResumeName = `${userInfo.username} 1`;
  } else {
    newResumeName = `${userInfo.username} ${Math.max(...defaultResumeNameNums) + 1}`;
  }

  // create newResume
  const newResume = await createResumeQ(userId, newResumeName);

  return newResume;
};

// 2-2. 내 이력서 목록 조회
export const findResumeList = async (data: any): Promise<Object> => {
  const myResumeList = await findResumeListQ(data);

  return myResumeList;
};

// 통합
// 1. (업무경험 / 프로젝트) 생성
export const createDetail = async (
  resumeId: number,
  createInfo: Record<string, string | number | boolean>,
  dbname: string
): Promise<Object> => {
  const newDetail = await createDetailQ(resumeId, createInfo, dbname);

  return newDetail;
};

// 2. 조회
export const findDetail = async (detailId: number, dbname: string, type: string): Promise<Object> => {
  const details = await findDetailQ(detailId, dbname, type);

  return details;
};

// 3. 수정
export const updateResume = async (detailId: number, updateInfo: Record<string, string | number>, dbname: string) => {
  const updatedResume = await updateResumeQ(detailId, updateInfo, dbname);

  return updatedResume;
};

// 4. 삭제
export const deleteResume = async (detailId: number, dbname: string, type: string) => {
  const deletedResume = await deleteResumeQ(detailId, dbname, type);

  return deletedResume;
};
