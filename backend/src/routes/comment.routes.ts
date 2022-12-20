import express from "express";
import * as commentService from "../services";
import { tokenValidator } from "../middlewares/verify-JWT";
import { db } from "../db";

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
commentRoute.patch("/:commentId", tokenValidator, async (req, res, next) => {
  const userId = Number(req.body.jwtDecoded.id);
  const commentId = Number(req.params.commentId);
});
//

commentRoute.get("/pagenation", async (req, res, next) => {
  const mark = String(req.query.mark);
  const count = Number(req.query.count);
});

// 개발용 댓글 목록불러오기
commentRoute.get("/", async (req, res, next) => {
  const [comments] = await db.query(`SELECT * FROM comment`);
  return res.json({
    comments,
  });
});
//현재  게시글 상세 가면 커맨트들이 나옴
//
