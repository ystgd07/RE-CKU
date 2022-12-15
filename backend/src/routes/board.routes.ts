import { CreateBoardDto } from "./dto/create-board.dto";
import express from "express";
import { postNotice, updateNotice } from "../services/board.service";
import { tokenValidator } from "../middlewares/verify-JWT";
import { validateBody } from "../middlewares/dto-validator";

const boardRoute = express();
boardRoute.post("/jwttest", tokenValidator, (req, res) => {
  console.log("req.body ", req.body);
  return res.json({ data: req.headers });
});

// 게시글 작성 API
boardRoute.post("/", validateBody(CreateBoardDto), tokenValidator, async (req, res, next) => {
  const { id } = req.body.jwtDecoded;
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

//
// 게시글 수정 API
boardRoute.patch("/:boardId", tokenValidator, async (req, res, next) => {
  const boardId = Number(req.params.boardId);
  const fromUserId = Number(req.body.jwtDecoded.id);
  const content = req.body.content;
  const title = req.body.title;
  const hashTags = req.body.hashTags;
  let hasResumeId = req.body.resumeId;
  if (hasResumeId === 0) hasResumeId = null;
  const toUpdate = {
    ...(content && { content }),
    ...(title && { title }),
    ...(hashTags && { hashTags }),
  };

  try {
    const udated = await updateNotice(boardId, fromUserId, toUpdate);
  } catch (err) {
    next(err);
  }
  console.log(toUpdate);
  return res.send("zz");
});

export default boardRoute;
