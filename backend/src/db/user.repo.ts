import * as utils from "./utils";
import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { db } from ".";
import { UserProfile } from "./schemas";
import { updateData } from "./utils/transData";

/** 인자로 userId 또는 email을 넣어주시면, 비밀번호를 제외한 사용자 정보를 드립니다. */
export const unIncludePasswordUserInfoQ = async (userIdOrEmail: number | string): Promise<UserProfile> => {
  const queryResultCoulmns = "id,username,point,email,phoneNumber,created,avatarUrl,clickedLikes ";
  let [userInfoRows, fields] = [[], []];

  // 파라미터로 들어온 data 값이 num이면 id로 찾고, 아니면 email로 찾음
  switch (typeof userIdOrEmail) {
    case "string":
      [userInfoRows, fields] = await db.query(
        `
      SELECT
        ${queryResultCoulmns} 
      FROM user 
      WHERE email=?`,
        [userIdOrEmail]
      );
      break;
    default:
      // user = await dataSource.getRepository(User).findOne({ where: { id: data } });
      [userInfoRows, fields] = await db.query(
        `
        SELECT
          ${queryResultCoulmns} 
          FROM user 
          WHERE id=?`,
        [userIdOrEmail]
      );
      break;
  }
  const result = utils.jsonParse(userInfoRows)[0];
  return result;
};
export const findOneUser = async (userIdOrEmail: number | string): Promise<UserProfile> => {
  const queryResultCoulmns = "id,username,point,email,phoneNumber,created,avatarUrl,password ";
  let [userInfoRows, fields] = [[], []];

  // 파라미터로 들어온 data 값이 num이면 id로 찾고, 아니면 email로 찾음
  switch (typeof userIdOrEmail) {
    case "string":
      [userInfoRows, fields] = await db.query(
        `
      SELECT
        ${queryResultCoulmns} 
      FROM user 
      WHERE email=?`,
        [userIdOrEmail]
      );
      break;
    default:
      // user = await dataSource.getRepository(User).findOne({ where: { id: data } });
      [userInfoRows, fields] = await db.query(
        `
        SELECT
          ${queryResultCoulmns} 
          FROM user 
          WHERE id=?`,
        [userIdOrEmail]
      );
      break;
  }
  const result = utils.jsonParse(userInfoRows)[0];
  return result;
};

export const createIndiUser = async (data: Record<string, string | number | boolean>) => {
  const { username, email, phoneNumber, password } = data;
  const [keys, values, valval] = utils.insertData(data);
  const [newUser] = await db.query(
    `
      INSERT INTO 
      user (${keys.join(", ")})
      VALUES (${values.join(", ")})
    `,
    [...valval]
  );
  // const newUser = dataSource.getRepository(User).create({ ...data });
  const result = utils.jsonParse(newUser).insertId;

  return result;
};

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
