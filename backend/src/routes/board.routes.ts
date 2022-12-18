import { CreateBoardDto } from "./dto/create-board.dto";
import express from "express";
import * as boardService from "../services/board.service";
import { validateBody, tokenValidator } from "../middlewares";

export const boardRoute = express();
// 전체 게시물 목록 조회
boardRoute.get("/all", async (req, res, next) => {
  try {
    const notices = await boardService.getNoticeAll();
    return res.status(200).json({
      msg: "게시글 전체 목록 조회",
      data: notices,
    });
  } catch (err) {
    next(err);
  }
});

// 게시물 상세조회
boardRoute.get("/:id/", async (req, res, next) => {
  const id = Number(req.params.id);
  let userId = null;
  // 혹시라도 토큰을 넣어서 보냈더라면 검증해주고 userId에 id값 넣기
  if (req.query.lifeIsGood) {
    userId = Number(req.query.lifeIsGood);
  }
  console.log(userId, "유저아이디 ");
  try {
    const notice = await boardService.findOneBoard(id, userId);
    return res.status(200).json({
      msg: "찾아냈습니다.",
      data: notice,
    });
  } catch (err) {
    next(err);
  }
});

// 게시글 작성 API
boardRoute.post("/", validateBody(CreateBoardDto), tokenValidator, async (req, res, next) => {
  // console.log(req.file);
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
    const result = await boardService.postNotice(data);
    return res.status(201).json({
      msg: "게시글 생성 완료",
      data: result.insertId,
    });
  } catch (err) {
    next(err);
  }
});

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
    const udated = await boardService.updateNotice(boardId, fromUserId, toUpdate);
    return res.status(200).json({
      status: 200,
      msg: "게시글이 수정되었습니다",
      data: udated,
    });
  } catch (err) {
    console.log("으악 에러야 ", err);
    next(err);
  }
});

// 게시글 좋아요 API
boardRoute.patch("/like/:boardId", tokenValidator, async (req, res, next) => {
  const id = Number(req.body.jwtDecoded.id);
  const boardId = Number(req.params.boardId);
  const { likesStatus } = req.body;
  console.log(id, boardId, likesStatus);
  try {
    const likes = await boardService.addLikes(id, boardId, likesStatus);
    return res.status(200).json({
      msg: `좋아요 상태 : ${likes} `,
    });
  } catch (err) {
    next(err);
  }
});

// 게시글 삭제 API
boardRoute.delete("/:boardId", tokenValidator, async (req, res, next) => {
  const { id } = req.body.jwtDecoded;
  const boardId = Number(req.params.boardId);
  try {
    await boardService.deleteNotice(id, boardId);
    return res.status(200).json({
      msg: "삭제 완료",
    });
  } catch (err) {
    next(err);
  }
});

// 내 게시물 보기

export default boardRoute;
