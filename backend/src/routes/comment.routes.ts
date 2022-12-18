import express from "express";
import * as commentService from "../services";
import { tokenValidator } from "../middlewares/verify-JWT";

export const commentRoute = express();
// 댓글달기 미완
commentRoute.post("/:boardId/comments", tokenValidator, async (req, res, next) => {
  const userId = req.body.jwtDecoded.id;
  const boardId = req.params.boardId;
  const { content } = req.body;
  const data = {
    userId,
    boardId,
    content,
  };
  try {
  } catch (err) {
    next(err);
  }
});
// 댓글 좋아요
commentRoute.patch("/:commentId/like", tokenValidator, async (req, res, next) => {
  const { id } = req.body.jwtDecoded;
  const commentId = Number(req.params.commentId);
  const { likesStatus } = req.body;
  try {
    const likes = await commentService.commentLikes(id, commentId, likesStatus);
    return res.status(200).json({
      msg: `좋아요 상태 : ${likes} `,
    });
  } catch (err) {
    next(err);
  }
});

//현재  게시글 상세 가면 커맨트들이 나옴
//
