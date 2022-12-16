import express from "express";
import { boardImg } from "../middlewares/multer";

const rootRoute = express();
rootRoute.post("/file/url", boardImg.single("image"), (req, res, next) => {
  res.status(200).json({
    imageUrl: req.file.path,
  });
});

export default rootRoute;
