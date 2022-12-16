import express from "express";
import { tokenValidator } from "../middlewares/verify-JWT";

const commentRoute = express();

// 게시글 좋아요 API
commentRoute.patch("/like/:commentId", tokenValidator, async (req, res, next) => {
  const { id } = req.body.jwtDecoded;
  const commentId = Number(req.params.commentId);
  const { likesStatus } = req.body;
  try {
    // const likes = await fuc(id, commentId, likesStatus);
    return res.status(200).json({
      status: 200,
      //   msg: `좋아요 상태 : ${likes} `,
    });
  } catch (err) {
    next(err);
  }
});
export default commentRoute;

//현재  게시글 상세 가면 커맨트들이 나옴
//
