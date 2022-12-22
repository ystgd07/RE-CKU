import * as utils from "./utils";
import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { db } from ".";
import { UserProfile } from "./schemas";
import { updateData } from "./utils/transData";

export const getUsersWhereRot = async () => {
  const getColumns = "id,username,point,avatarUrl,working";
  const [liveInRot] = await db.query(`
    SELECT ${getColumns}
    FROM user
    WHERE point > 100
  `);
  const result = utils.jsonParse(liveInRot);
  return result;
};

export const getUsersByAdmin = async () => {
  const getColumns =
    "id,username,point,email,phoneNumber,created,avatarUrl,password,clickedLikes,gitHubUrl,howToLogin,role,working";
  const [users] = await db.query(`
    SELECT ${getColumns}
    FROM user
    WHERE role = user
  `);
  const result = utils.jsonParse(users);
  return result;
};

/** 인자로 userId 또는 email을 넣어주시면, 비밀번호를 제외한 사용자 정보를 드립니다. */
export const unIncludePasswordUserInfoQ = async (userIdOrEmail: number | string): Promise<UserProfile> => {
  const queryResultCoulmns =
    "id,username,point,email,phoneNumber,created,avatarUrl,clickedLikes,gitHubUrl,howToLogin,role,working";
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
  const queryResultCoulmns =
    "id,username,point,email,phoneNumber,created,avatarUrl,password,clickedLikes,gitHubUrl,howToLogin,role,working,ban ";
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
  console.log("업뎃내역 ", data);
  await db.query(
    `
    UPDATE user 
    SET ${keys.join(", ")},updated=now() 
    WHERE id = ?
    `,
    [...values, id]
  );
  // typeORM 코드
  // await dataSource.getRepository(User).update(id, toUpdate);
  return "ok";
};

// 리폿했는지 여부
export const checkReportedQ = async (reporter: number, defendant: number) => {
  const [checked] = await db.query(
    `
    SELECT *
    FROM user_report_table
    WHERE 
      reporterUserId = ?
      AND
      defendantUserId = ?
  `,
    [reporter, defendant]
  );

  const result = utils.jsonParse(checked)[0];
  return result;
};

export const reportQ = async (reportData: { reporterUserId: number; defendantUserId: number; reason: string }) => {
  const [keys, values, valval] = utils.insertData(reportData);
  const [newReport] = await db.query(
    `
      INSERT INTO 
      user_report_table (${keys.join(", ")})
      VALUES (${values.join(", ")})
    `,
    [...valval]
  );
  await db.query(
    `
    UPDATE user
    SET reported= reported+1
    WHERE id=?
  `,
    [reportData.defendantUserId]
  );

  const result = utils.jsonParse(newReport);
  console.log("리포트후 리절트 =", result);
  return true;
};

export const cancelReportQ = async (reporterUserId: number, defendantUserId: number) => {
  await db.query(
    `
    DELETE 
    FROM user_report_table
    WHERE 
      reporterUserID = ?
      AND
      defendantUserID = ?
  `,
    [reporterUserId, defendantUserId]
  );
  console.log("리폿취소요");
  await db.query(
    `
    UPDATE user
    SET reported = reported-1
    WHERE id = ?
  `,
    [defendantUserId]
  );

  return true;
};

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
