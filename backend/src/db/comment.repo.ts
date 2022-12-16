import { db } from "./index.repo";
import * as utils from "./utils/index.utils";

// 좋아요 테이블에 board 값 추가
// 댓글의 좋아요 추가
export const likeCommentFromUser = async (data: Record<number, number>) => {
  const [keys, values, valval] = utils.insertData(data);
  await db.query(
    `
      INSERT 
      INTO 
      comment_like_maping (${keys.join(", ")})
      VALUES (${values})
    `,
    [...valval]
  );
  return true;
};

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
