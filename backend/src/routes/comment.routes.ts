import express from "express";
import * as commentService from "../services/comment.service";
import { tokenValidator, validateBody } from "../middlewares/";
import { db } from "../db";
import { UpdateCommentDto } from "./dto/update-comment.dto";

export const commentRoute = express();

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

// 댓글 수정
commentRoute.patch("/:commentId", validateBody(UpdateCommentDto), tokenValidator, async (req, res, next) => {
  const userId = Number(req.body.jwtDecoded.id);
  const commentId = Number(req.params.commentId);
  const { text } = req.body;
  const data = { text };
  try {
    const result = commentService.updateComment(userId, commentId, data);
    return res.status(200).json({
      msg: "댓글 수정 완료",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
//

// 개발용 댓글 목록불러오기
commentRoute.get("/", async (req, res, next) => {
  const [comments] = await db.query(`SELECT * FROM comment`);
  return res.json({
    comments,
  });
});
//현재  게시글 상세 가면 커맨트들이 나옴
//
