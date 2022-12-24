import * as utils from "./utils";
import { db } from ".";
import { UserProfile } from "./schemas";

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

// 2-3. 신고 내역 조회
export const findReportQ = async (userId: number) => {
  const [reportInfo, ] = await db.query(
    `SELECT
        reporterUserId,
        defendantUserId,
        reason
        FROM user_report_table
        WHERE defendantUserId = ?
        `, userId);

  const reportInfos = reportInfo;
  return reportInfos;
};

// 3-1. 회원 정보 수정
export const updateUserQ = async (userId: number, updateInfo: Record<string, string | number>) => {
  const [key, value] = utils.updateData(updateInfo);

  const updatedUser = await db.query(
    `UPDATE user SET ${key.join(", ")}, updated = now() WHERE id = ?`,
    [...value, userId]
  );

  return updatedUser;
}

// 3-2. 2주 밴
export const banUserQ = async (userId: number, data: Record<string, number | string>, type: string) => {
  const [keys, values] = utils.updateData(data);
  const active = type === "BAN" ? 0 : 1;

  const [user, board, comment] = await Promise.all([
    await db.query(`UPDATE user SET ${keys}, RT = "" WHERE id = ? `, [...values, userId]),
    await db.query(`UPDATE board SET active = ? WHERE fromUserId = ? `, [active, userId]),
    await db.query(`UPDATE comment SET active = ? WHERE userId = ? `, [active, userId])
  ]);

  return true;
};