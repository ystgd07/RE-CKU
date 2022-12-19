import { db } from "./index.repo";
import * as userRepository from "../db/user.repo";
import * as utils from "./utils/";
export const savePointByComment = async (data: { userId: number; commentId: number }) => {
  const [keys, values, valval] = utils.insertData(data);
  await db.query(
    `
      INSERT INTO point_from_comment (${keys.join(", ")})
      VALUES (${values.join(", ")})
    `,
    [...valval]
  );

  // 보드정보에서 userId 를 가져옴
  const [commentRows] = await db.query(
    `
    SELECT 
      boardId
    FROM board
    WHERE id = ?
  `,
    [data.commentId]
  );
  const userId = commentRows[0].userId;
  console.log(userId);

  // 해당 댓글 주인의 포인트 상승
  await db.query(
    `
      UPDATE user 
      SET 
      point = point+?
      WHERE id= ?
    `,
    [100, userId]
  );
};

// 해당 댓글에 좋아요 누른 사람이 저번에도 눌렀는지 확인하는 것
export const findSavedPointByComment = async (userId: number, commentId: number) => {
  const [result] = await db.query(
    `
      SELECT userId
      FROM point_from_comment
      WHERE (userId=? AND commentId=?)
    `,
    [userId, commentId]
  );
  const returnValue = utils.jsonParse(result)[0];
  return returnValue;
};

// 댓글의 좋아요 추가
export const likeCommentFromUser = async (data: Record<number, number>) => {
  const [keys, values, valval] = utils.insertData(data);
  await db.query(
    `
      INSERT 
      INTO 
      comment_like_maping (${keys.join(", ")})
      VALUES (${values.join(", ")})
    `,
    [...valval]
  );
  return true;
};

// 좋아요 취소
export const unlikeCommentFromUser = async (userId: number, commentId: number) => {
  // 삭제에 필요한것들 userId, boardId WHERE (coulmn = ? ADN coulmn2 = ?)
  await db.query(
    `
      DELETE
      FROM comment_like_maping
      WHERE (userId = ? AND commentId = ?)
    `,
    [userId, commentId]
  );
  return true;
};

// 댓글 좋아요 눌렀는지 확인
export const alreadyLikesComment = async (commentId: number) => {
  const table = await db.query(
    `
      SELECT userId 
      FROM comment_like_maping 
      WHERE(commentId=?)
    `,
    [commentId]
  );

  const overlap = utils.jsonParse(table)[0][0];
  return overlap;
};

// 댓글 달기
export const addCommentQ = async (data: { userId: number; boardId: number; text: string }) => {
  const [keys, values, valval] = utils.insertData(data);
  const [newComment] = await db.query(
    `
    INSERT INTO 
      comment (${keys.join(", ")})
    VALUES (${values.join(", ")})
  `,
    [...valval]
  );
  const result = utils.jsonParse(newComment);

  return result;
};

// 댓글 지우기  매핑테이블도 지워야함
export const deleteCommentQ = async (userId: number, boardId: number, commentId: number) => {
  const [rows] = await db.query(
    `
    DELETE
    FROM comment
    WHERE (userId = ? AND boardId = ? AND id = ?) 
  `,
    [userId, boardId, commentId]
  );
  console.log(rows);
  // 해당 댓글에 달렸던 좋아요 데이터 삭제
  const [mapingRows] = await db.query(
    `
    DELETE 
    FROM comment_like_maping 
    WHERE commentId = ?
  `,
    [commentId]
  );
  const result = utils.jsonParse(rows)[0];
  return result;
};
