import * as commentRepo from "../db/comment.repo";

export const commentLikes = async (userId: number, commentId: number, likesStatus: boolean): Promise<boolean> => {
  const data = {
    userId,
    commentId,
  };
  try {
    const alreadyLikes = await commentRepo.alreadyLikesComment(commentId);
    console.log("alreadyLikeszzz : ", alreadyLikes);
    // 좋아요 하지 않은 게시물이라면 좋아요
    if (!likesStatus && !alreadyLikes) {
      console.log("ㅌㅌ");
      await commentRepo.likeCommentFromUser(data);

      // 아래 변수명에 포인트 적립여부가 담겨있음
      console.log("ㅎㅎ");
      const alreadySavePoint = await commentRepo.findSavedPointByComment(userId, commentId);
      console.log("ㅋㅋ", alreadySavePoint);
      // 첫번째 좋아요라 포인트적립이 되지 않았을 경우 적립
      if (!alreadySavePoint) {
        console.log("첫번째 좋아요! 포인트 적립!");
        await commentRepo.savePointByComment(data);
      }
      return true; // 좋아요
    } else {
      await commentRepo.unlikeCommentFromUser(userId, commentId);
      return false; // 취소
    }
  } catch (err) {
    throw Error(err);
  }
};
