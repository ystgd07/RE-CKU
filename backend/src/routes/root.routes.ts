import express from "express";
import * as middlewares from "../middlewares/multer";

export const rootRoute = express();
rootRoute.post("/file/url", middlewares.boardImg.single("image"), (req, res, next) => {
  res.status(200).json({
    imageUrl: req.file.path,
  });
});

export default rootRoute;
