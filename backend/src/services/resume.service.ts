//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

//import { CreateUserDto } from "../routes/dto/index.dto";
// import { dataSource, updateUser } from "../db/index.schema";
// import { createIndiUser, findOneAuthData, findOneUser, createAuthData, updateAuthData } from "../db/index.schema";
// import { send } from "../config/sendMail";
// import { EmailAuth } from "../db/schemas/index.schema";
import { createResumeQ, findResumeListQ, createDetailQ, findDetailQ, updateResumeQ, deleteResumeQ } from "../db/index.schema";

// 1. 이력서 생성
export const createResume = async (id: number, newName: string): Promise<Object> => {
  const newResume = await createResumeQ(id, newName);

  return newResume;
};

// 2-2. 내 이력서 목록 조회
export const findResumeList = async (data: any): Promise<Object> => {
  const myResumeList = await findResumeListQ(data);

  return myResumeList;
};

// 통합
// 1. (업무경험 / 프로젝트) 생성
export const createDetail = async (resumeId: number, createInfo: Record<string, string | number | boolean>, dbname: string): Promise<Object> => {
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
