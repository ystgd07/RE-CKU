//import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { dataSource, db } from ".";
import { positonEnum, Resume } from "./schemas";
import { updateData, insertData } from "./utils/transData";

// 이력서
// 1. 이력서 (틀) 생성
export const createResumeQ = async (id: number, newName: string) => {
  const newResume = await db.query(`INSERT INTO resume(usedUserId, name) VALUES (?,?)`, [id, newName]);

  return newResume;
};

// 2-2. 내 이력서 목록 조회
export const findResumeListQ = async (userId: number) => {
  const myResumeList = await db.query(`SELECT * FROM resume WHERE usedUserId=?`, userId);

  return myResumeList;
};

// 통합
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

// 2. (이력서 / 업무경험 / 프로젝트) 조회
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
