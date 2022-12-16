import * as commentRepo from "../db/comment.repo";

export const commentLikes = async (userId: number, commentId: number, likesStatus: boolean): Promise<boolean> => {
  const data = {
    userId,
    commentId,
  };
  try {
    const alreadyLikes = await commentRepo.alreadyLikesComment(commentId);
    console.log("alreadyLikeszzz : ", alreadyLikes);

    // 아직 좋아요하지 않았고, DB에서도 그렇다면 좋아요 로직
    if (!likesStatus && !alreadyLikes) {
      await commentRepo.likeCommentFromUser(data);
      return true; // 좋아요
    } else {
      await commentRepo.unlikeCommentFromUser(userId, commentId);
      return false; // 취소
    }
  } catch (err) {
    throw Error(err);
  }
};
