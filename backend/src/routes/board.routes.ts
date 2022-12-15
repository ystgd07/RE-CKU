import { CreateBoardDto } from "./dto/create-board.dto";
import express from "express";
import { postNotice } from "../services/board.service";
import { tokenValidator } from "../middlewares/verify-JWT";
import { validateBody } from "../middlewares/dto-validator";

const boardRoute = express();
boardRoute.post("/jwttest", tokenValidator, (req, res) => {
  console.log("req.body ", req.body);
  return res.json({ data: req.headers });
});

// 게시글 작성 API
boardRoute.post("/", validateBody(CreateBoardDto), tokenValidator, async (req, res, next) => {
  const { id, role } = req.body.jwtDecoded;
  const { title, content, hashTags } = req.body;
  let { resumeId } = req.body;
  if (resumeId === 0) resumeId = null;
  const data: Record<string, string | boolean | number> = {
    fromUserId: id,
    content,
    title,
    hashTags,
    hasResumeId: resumeId,
  };
  console.log("바디의 데이터 : ", data);
  try {
    const result = await postNotice(data);
    return res.status(201).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
export default boardRoute;
