// stack, position, tag..?

import { dataSource, db } from "./index.schema";
// import { positonEnum, Resume } from "./schemas/index.schema";
import { updateData, insertData } from "./utils/transData";

// stack
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