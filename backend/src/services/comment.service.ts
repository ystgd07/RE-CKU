import * as commentRepo from "../db/comment.repo";

export const commentLikes = async (userId: number, commentId: number, likesStatus: boolean): Promise<boolean> => {
  const data = {
    userId,
    commentId,
  };
  try {
    // 댓글에 좋아요 여부
    const alreadyLikes = await commentRepo.alreadyLikesComment(commentId);
    console.log("alreadyLikeszzz : ", alreadyLikes);

    // 좋아요 하지 않은 게시물이라면 좋아요 및 포인트 습득
    if (!likesStatus && !alreadyLikes) {
      await commentRepo.likeCommentFromUser(data);

      // 아래 변수명에 포인트 적립여부가 담겨있음
      const alreadySavePoint = await commentRepo.findSavedPointByComment(userId, commentId);
      console.log("포인트받음?", alreadySavePoint);
      // 첫번째 좋아요라 포인트적립이 되지 않았을 경우 적립
      if (!alreadySavePoint) {
        console.log("첫번째 좋아요! 포인트 적립!");
        await commentRepo.savePointByComment(data);
      }
      return true; // 좋아요
    } else {
      console.log("좋아요 취소 끝.");
      await commentRepo.unlikeCommentFromUser(userId, commentId);
      return false; // 취소
    }
  } catch (err) {
    throw Error(err);
  }
};

export const addComment = async (data: { userId: number; boardId: number; text: string }) => {
  try {
    const result = await commentRepo.addCommentQ(data);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(`500, 서버오류`);
  }
};

export const deleteComment = async (userId: number, boardId: number, commentId: number) => {
  try {
    const isComment = await commentRepo.findComment(commentId);
    if (isComment === false) throw new Error(`404`);

    const result = await commentRepo.deleteCommentQ(userId, boardId, commentId);
    return result;
  } catch (err) {
    if (err.message === `404`) throw new Error(`404, 댓글을 찾을 수 없습니다.`);
    throw new Error(`500, 서버 오류`);
  }
};
