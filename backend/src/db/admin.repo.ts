import * as utils from "./utils";
import { db } from ".";
import { UserProfile } from "./schemas";
import { updateData } from "./utils/transData";


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
        working,
        created
        FROM user
        WHERE role != 'admin'`);

  const users = usersInfo;
  return users;
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