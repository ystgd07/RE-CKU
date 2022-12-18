import express from "express";
<<<<<<< HEAD
import * as commentService from "../services";
=======
import * as commentService from "../services/index.service";
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
import { tokenValidator } from "../middlewares/verify-JWT";

export const commentRoute = express();
// 댓글달기 미완
<<<<<<< HEAD
commentRoute.post("/:boardId/comments", tokenValidator, async (req, res, next) => {
=======
commentRoute.post("/comment/:boardId", tokenValidator, async (req, res, next) => {
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
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
<<<<<<< HEAD
commentRoute.patch("/:commentId/like", tokenValidator, async (req, res, next) => {
=======
commentRoute.patch("/like/:commentId", tokenValidator, async (req, res, next) => {
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
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
