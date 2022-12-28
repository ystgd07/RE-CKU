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
    "id,matching,username,point,email,phoneNumber,created,avatarUrl,clickedLikes,gitHubUrl,howToLogin,role,working,chance";
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

// 고인물 목록 조회
export type Rot = {
  username: string;
  id: number;
  point: number;
  corrections: number;
};
export type RotList = Rot[];
export const getRotListQ = async (userId: number): Promise<RotList> => {
  const [rotList] = await db.query(
    `
    SELECT 
      username,
      id,
      point,
      corrections
    FROM user
    WHERE 
      id != ? AND
      point > 200 AND
      working = true
    ORDER BY rand()
    LIMIT 6
  `,
    [userId]
  );
  const result = utils.jsonParse(rotList);
  return result;
};

// 매칭 현황
export type MatchInfo = {
  matchInfo: {
    matchingId: number;
    step: string;
    mentoId: number;
    menteeId: number;
    created: "";
    rotId: number;
    mentoEmail: string;
    mentoName: string;
    point: number;
  };
  cancelAble: boolean;
};

export type Match = {
  id: number;
  step: string;
  complate: number;
  mentoComplate: string;
  menteeComplate: string;
};
export const findMatchByMatchingId = async (matchingId: number): Promise<Match> => {
  const [connect] = await db.query(
    `
    SELECT 
      id,
      step,
      mentoComplate,
      menteeComplate
    FROM connect 
    WHERE
      id=?
  `,
    [matchingId]
  );
  const result = utils.jsonParse(connect)[0];

  return result;
};

export const findMatchQ = async (userId: number): Promise<MatchInfo> => {
  const result: MatchInfo = {
    matchInfo: {
      matchingId: 0,
      step: "",
      mentoId: 0,
      menteeId: 0,
      created: "",
      rotId: 0,
      mentoEmail: "",
      mentoName: "",
      point: 0,
    },
    cancelAble: false,
  };
  const [connect] = await db.query(
    `
      SELECT 
        c.id as matchingId,
        c.step,
        c.mentoId,
        c.menteeId,
        c.created,
        u.id as rotId,
        u.email as mentoEmail,
        u.username as mentoName,
        u.point
      FROM connect c
      JOIN user u
      on mentoId = u.id
      WHERE 
        menteeId = ?
    `,
    [userId]
  );
  const parseConnect = utils.jsonParse(connect)[0];
  console.log("이상이상", parseConnect);
  result.matchInfo = parseConnect;
  console.log(utils.jsonParse(connect)[0]);
  if (result.matchInfo?.step === "요청중") {
    result.cancelAble = true;
  }
  if (!parseConnect) {
    return null;
  }
  return result;
};

// 매칭 요청
export const createMatchQ = async (data: { step: string; menteeId: number; mentoId: number }): Promise<number> => {
  const [keys, values, valval] = utils.insertData(data);
  const [create] = await db.query(
    `
    INSERT INTO 
    connect (${keys.join(", ")})
    VALUES (${values.join(", ")})
  `,
    [...valval]
  );
  const parseCreate = utils.jsonParse(create);
  const matchingId = parseCreate.insertId;
  // 만들어진 매칭 id 값으로 멘티의 유저정보 업데이트
  await db.query(
    `
    UPDATE user
    SET 
      matching = ?
    WHERE
      id = ?
  `,
    [matchingId, data.menteeId]
  );
  // 위 로직은 트렌젝션 사용해야할듯
  return matchingId;
};

// 매칭 취소
export const cancelMatchQ = async (matchingId: number): Promise<boolean> => {
  const [zz] = await db.query(
    `
    DELETE FROM connect
    WHERE id = ? 
  `,
    [matchingId]
  );
  await db.query(
    `
    UPDATE user
    SET
      matching = 0
    WHERE 
      matching = ?
  `,
    [matchingId]
  );
  // 여기도 트렌젝션
  return true;
};

// 매칭 수락 ( 고인물 )
export const acceptMatchQ = async (matchingId: number, menteeId: number): Promise<boolean> => {
  const [updateMatch] = await db.query(
    `
    UPDATE connect
    SET
      step = "진행중"
    WHERE 
      id= ? AND
      menteeId = ?
  `,
    [matchingId, menteeId]
  );
  return true;
};

// 매칭 끝내기버튼
export const successMatchQ = async (matchingId: number, data: { role: string }): Promise<string> => {
  // 멘티로 들어오면 count = ? mentee = ?
  console.log(data.role);
  const [updated] = await db.query(
    `
    UPDATE connect
    SET 
      ${data.role} = 1
    WHERE 
      id = ?
  `,
    [matchingId]
  );
  const result = data.role === "menteeComplate" ? "멘티가 종료누름" : "멘토가 종료누름";
  return result;
};

// 매칭 종료 ( 멘티id 비우고, 멘토id 만 남기기)
export const complateMatch = async (matchingId: number) => {
  console.log("??");
  const [match] = await db.query(
    `
    SELECT 
      mentoId,
      menteeId
    FROM connect
    WHERE
      id = ?
  `,
    [matchingId]
  );
  const parseMatch = utils.jsonParse(match)[0];
  const mentoId = parseMatch.mentoId;
  const menteeId = parseMatch.menteeId;
  console.log(parseMatch);
  await db.query(
    `
    UPDATE connect
    SET
      menteeId = 0 ,
      step = "완료"
    WHERE 
      id = ?
  `,
    [matchingId]
  );
  await db.query(
    `
    UPDATE user
    SET
      corrections=corrections+1 ,
      point = point +50
    WHERE
      id = ?
  `,
    [mentoId]
  );
  await db.query(
    `
    UPDATE user
    SET
      matching = 0,
      point = point -50
    WHERE
      id = ?
  `,
    [menteeId]
  );
  // 트렌젝션 해야할듯

  return "매칭 종료";
};

type ZZ = {
  matchingId: number;
  step: string;
  menteeId: number;
  menteeName: string;
  menteeEmail: string;
  created: string;
};
// 고인물에게 들어온 요청
export const getRequestCorrectionQ = async (userId: number) => {
  // step = 요청중, mentoId =userId , complate = 0인것들을 created DESC 로 뱉기
  console.log("이까진 오나?");
  const [list] = await db.query(
    `
    SELECT 
      c.id as matchingId,
      c.step,
      c.menteeId,
      u.username as menteeName,
      u.email as menteeEmail,
      c.created,
    FROM connect c
    JOIN user u
    ON u.id = menteeId 
    WHERE 
      step = '요청중' OR step = '진행중' AND
      
      mentoId = ? AND
      mentoComplate <0
    ORDER BY created DESC
  `,
    [userId]
  );
  const result = utils.jsonParse(list);
  type Req = {
    matchingId: number;
    step: string;
    menteeId: number;
    created: string;
    cancelAble: boolean;
  };
  const zz = result.map((req: Req) => {
    req.cancelAble = req.step === "진행중" ? false : true;
    return { ...req };
  });
  console.log(zz);
  if (result.step === "진행중") {
    result.cancelAble = false;
  }
  result.cancelAble = true;
  return result;
};
