//import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { dataSource, db } from "./index.repo";
import { positonEnum, Resume } from "./schemas/index.schema";
import { updateData, insertData } from "./utils/transData";

// 이력서
// 1. 이력서 (틀) 생성
export const createResumeQ = async (userId: number, newName: string) => {
  const newResume = await db.query(`INSERT INTO resume(usedUserId, name) VALUES (?,?)`, [userId, newName]);

  return newResume;
};

// 2-2. 내 이력서 목록 조회
export const findMyResumesQ = async (userId: number) => {
  const myResumes = await db.query(`SELECT * FROM resume WHERE usedUserId=?`, userId);

  return myResumes;
};

// 2-3. 이력서 상세 조회
export const getResumeQ = async (resumeId: number) => {
      const resumeInfo = await db.query(`SELECT * FROM resume WHERE id = ?`, resumeId);

      return resumeInfo;
};


// 1. (업무경험 / 프로젝트) 생성
export const createDetailQ = async (
  resumeId: number,
  createInfo: Record<string, string | number | boolean>,
  dbname: string
) => {
  const [keys, values, arrValues] = insertData(createInfo);

  const newCareer = await db.query(
    `INSERT INTO ${dbname} (usedResumeId, ${keys.join(", ")}) VALUES (?, ${values.join(",")})`,
    [resumeId, ...arrValues]
  );

  return newCareer;
};

// 2-1. 업무경험들 조회
export const getCareersQ = async (resumeId: number) => {
    const careers = await db.query(`SELECT * FROM career WHERE usedResumeId = ?`, resumeId);

    return careers;
};

// 2-2. 프로젝트들 조회
export const getProjectsQ = async (resumeId: number) => {
  const projects = await db.query(`SELECT * FROM project WHERE usedResumeId = ?`, resumeId);

  return projects;
};

// 2-3. 업무경험 조회
export const getCareerQ = async (careerId: number) => {
  const career = await db.query(`SELECT * FROM career WHERE id = ?`, careerId);

  return career;
};

// 2-4. 프로젝트 조회
export const getProjectQ = async (projectId: number) => {
  const project = await db.query(`SELECT * FROM project WHERE id = ?`, projectId);

  return project;
};


// 2-1. 프로젝트 조회
export const findDetailQ = async (detailId: number, dbname: string, type: string) => {
  if (type == "all") {
    if (dbname == "resume") {
      const details = await db.query(`SELECT * FROM ${dbname} WHERE id = ?`, detailId);

      return details;
    }
    const details = await db.query(`SELECT * FROM ${dbname} WHERE usedResumeId = ?`, detailId);

    return details;
  } else {
    // 업무경험 / 프로젝트 한개 조회
    const details = await db.query(
      `SELECT *
                                        FROM ${dbname}
                                        WHERE id = ?`,
      detailId
    );

    return details;
  }
};

// 3. (기본 정보, 업무경험, 프로젝트) 이력서 수정
export const updateResumeQ = async (detailId: number, updateInfo: Record<string, string | number>, dbname: string) => {
  const [key, value] = updateData(updateInfo);

  const updatedResume = await db.query(`UPDATE ${dbname} SET ${key.join(", ")} WHERE id = ?`, [...value, detailId]);

  return updatedResume;
};

// 4. 삭제
export const deleteResumeQ = async (detailId: number, dbname: string, type: string) => {
  if (type == "all") {
    const deletedResume = await db.query(`DELETE FROM ${dbname} WHERE usedResumeId = ?`, detailId);

    return deletedResume;
  } else {
    const deletedResume = await db.query(`DELETE FROM ${dbname} WHERE id = ?`, detailId);

    return deletedResume;
  }
};



