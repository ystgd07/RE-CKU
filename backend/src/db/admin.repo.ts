import * as utils from "./utils";
import { db } from ".";
import { UserProfile } from "./schemas";
import { updateData } from "./utils/transData";


// 2-1. 전체 회원 목록 조회
export const findUsersQ = async () => {
  const [usersInfo, ] = await db.query(
    `SELECT 
        id AS userId,
        username,
        email,
        phoneNumber,
        avatarUrl,
        active,
        howToLogin,
        point,
        clickedLikes,
        reported,
        working,
        created
        FROM user
        WHERE role != 'admin'`);

  const users = usersInfo;
  return users;
};

// 2-2. 최악의 회원 목록 조회
export const findWorstUsersQ = async () => {
      const [usersInfo, ] = await db.query(
        `SELECT 
        id AS userId,
        username,
        email,
        phoneNumber,
        avatarUrl,
        active,
        howToLogin,
        point,
        clickedLikes,
        reported,
        working,
        created
        FROM user
        WHERE role != 'admin'
            AND reported > 0
        ORDER BY reported DESC
        LIMIT 20`);

      const users = usersInfo;
      return users;
};

// 3.
export const updateUserQ = async (userId: number, updateInfo: Record<string, string | number>) => {
  const [key, value] = updateData(updateInfo);

  const updatedUser = await db.query(
    `UPDATE user SET ${key.join(", ")},updated=now() WHERE id = ?`,
    [...value, userId]
  );

  return updatedUser;
}

export const banUserQ = async (targerId: number, data: Record<string, number | string>) => {
  const [keys, values] = utils.updateData(data);
  console.log("레포", keys, values);
  await db.query(
    `
    UPDATE user
    SET ${keys}, RT = ""
    WHERE id = ?
  `,
    [...values, targerId]
  );
  return true;
};
/*
export const updateUser = async (id: number, data: Record<string, string | boolean | number>): Promise<string> => {
  const [keys, values] = updateData(data);
  await db.query(
    `
    UPDATE user
    SET ${keys.join(", ")}
    WHERE id = ?
    `,
    [...values, id]
  );
  // typeORM 코드
  // await dataSource.getRepository(User).update(id, toUpdate);
  return "ok";
};
*/