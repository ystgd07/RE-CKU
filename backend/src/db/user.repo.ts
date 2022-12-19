import * as utils from "./utils/parseToJSON";
import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { dataSource, db } from ".";
import { roleEnum, User, UserProfile } from "./schemas";
import { updateData } from "./utils/transData";

/** 인자로 userId 또는 email을 넣어주시면, 비밀번호를 제외한 사용자 정보를 드립니다. */
export const findOneUser = async (userIdOrEmail: number | string): Promise<UserProfile> => {
  const queryResultCoulmns = "id,username,email,phoneNumber,created,avatarUrl,password ";
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

export const createIndiUser = async (data: CreateUserDto) => {
  const { username, email, phoneNumber, password } = data;
  // const newUser = dataSource.getRepository(User).create({ ...data });
  const newUser = db.query(`INSERT INTO user(username,email,phoneNumber,password) VALUES(?,?,?,?)`, [
    username,
    email,
    phoneNumber,
    password,
  ]);

  return newUser;
};

export const updateUser = async (id: number, data: Record<string, string | boolean | number>): Promise<boolean> => {
  const [keys, values] = updateData(data);
  await db.query(`UPDATE user SET ${keys.join(", ")} WHERE id = ?`, [...values, id]);
  // typeORM 코드
  // await dataSource.getRepository(User).update(id, toUpdate);
  return true;
};
