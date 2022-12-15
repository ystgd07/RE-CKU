import { db } from "./index.schema";
import { updateData, insertData } from "./utils/transData";

//   const newUser = db.query(`INSERT INTO user(username,email,phoneNumber,password) VALUES(?,?,?,?)`, [
// 상세 게시글 보기
export const findOneBoard = async (data: number) => {
  const boardInfo = await db.query(
    `SELECT a.id,a.content,a.created,fromUserId,title,hashTags, s.id,s.content,s.created,s.userId  From board a JOIN comment s ON s.boardId=a.id WHERE id=?`,
    [data]
  );
  return boardInfo[0][0];
  // 게시물보여줄때
  // 게시물id, 타이틀, 내용, 게시일, 작성자, 이력서:{}, 댓글들:[{댓글id ,내용, 유저이름, 유저아바타, 생성일자 }{}{}]
  // return user[0][0];
};

export const findComments = async (boardId: number) => {
  const comments = await db.query(`SELECT * FROM comment as A`);
};

export const create = async (data: Record<string, string | number | boolean>): Promise<boolean> => {
  console.log("서비스가 받아온 data : ", data);
  const [keys, values, arrValues] = insertData(data);
  await db.query(`INSERT INTO board (${keys.join(", ")}) VALUES (${values.join(",")})`, [...arrValues]);
  return true;
};
