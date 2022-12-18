//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

//import { CreateUserDto } from "../routes/dto/index.dto";
// import { dataSource, updateUser } from "../db/index.schema";
// import { createIndiUser, findOneAuthData, findOneUser, createAuthData, updateAuthData } from "../db/index.schema";
// import { send } from "../config/sendMail";
// import { EmailAuth } from "../db/schemas/index.schema";
import {
  findOneUser,
  createResumeQ,
  findMyResumesQ,
  createDetailQ,
  findDetailQ,
  updateResumeQ,
  deleteResumeQ, getResumeQ, getCareerQ, getCareersQ, getProjectsQ,
} from "../db/index.repo";
import {indiInfo} from "./user.service";
import * as repository from "../db/index.repo";

// 1. 이력서 생성
export const createResume = async (userId: number): Promise<Object> => {
  // create default resume name
  let defaultResumeNameNums = [];
  let newResumeName = "";

  const userInfo = await findOneUser(userId, "비번빼고");
  const myResumeList = await findMyResumesQ(userId);

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
export const findMyResumes = async (userId: number): Promise<Object> => {
  const myResumes = await findMyResumesQ(userId);

  return myResumes;
};

// 2-3. 이력서 상세 조회
export const getMyResume = async (userId: number, resumeId: number): Promise<Object> => {
  const userInfo = await findOneUser(userId, "비번빼고");
  const resumeInfo = await getResumeQ(resumeId);
  const careers = await getCareersQ(resumeId);
  const projects = await getProjectsQ(resumeId);

  Promise.all([userInfo, resumeInfo, careers, projects])
    .then((values) => {
      console.log(values)
    })
    .catch(error => {
      console.log(error.message);
    })

  return myResumes;
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
