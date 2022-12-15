import express from "express";
import { tokenValidator } from "../middlewares/verify-JWT";

const boardRoute = express();
boardRoute.post("/", tokenValidator, (req, res) => {
  console.log("req.body ", req.body);
  return res.json({ data: req.headers });
});

// 게시글 작성 API
boardRoute.post("/", tokenValidator, async (req, res, next) => {
  const { id, role } = req.body.jwtDecoded;
  const { title, content, hashTags, resumeId } = req.body;
  const data = {
    id,
    title,
    content,
    hashTags,
    resumeId,
  };
  try {
    // const result = await postNotice(data)
  } catch (err) {
    next(err);
  }
});
export default boardRoute;
