import express from "express";
import * as middlewares from "../middlewares/multer";
import sharp from "sharp";
import fs from "fs";
export const rootRoute = express();
rootRoute.post("/file/url", middlewares.boardImg.single("image"), (req, res, next) => {
  try {
    sharp(req.file.path)
      .resize({ width: 600 })
      .withMetadata()
      .toBuffer((err, buffer) => {
        if (err) throw new Error(`500, 이미지 저장중 오류`);
        // 새로저장
        fs.writeFile(req.file.path, buffer, (err) => {
          if (err) throw new Error(`500, 파일 저장중 오류`);
        });
      });
    return res.status(200).json({
      imageUrl: req.file.path,
    });
  } catch (err) {
    next(err);
  }
});

export default rootRoute;
