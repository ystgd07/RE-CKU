import multer from "multer";
import { Request, Response, NextFunction } from "express";

// 파일 경로와 확장자 지정해주는 것
const boardImageUrl = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "uploads/boards/images/");
  },
  filename: (req, file, cb) => {
    // 확장자 찾아서 mimeType 변경해주는 조건문
    let mimeType = "";
    switch (file.mimetype) {
      case "image/bmp":
        mimeType = "png";
        break;
      case "image/gif":
        mimeType = "png";
        break;
      case "image/jpeg":
        mimeType = "png";
        break;
      case "image/png":
        mimeType = "png";
        break;
      case "image/webp":
        mimeType = "png";
        break;
      default:
        mimeType = "png";
    }
    cb(null, `${Math.random().toString(36).substring(2, 12)}_${Date.now()}.${mimeType}`);
  },
});
const avatarImageUrl = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "uploads/boards/images/");
  },
  filename: (req, file, cb) => {
    // 확장자 찾아서 mimeType 변경해주는 조건문
    let mimeType = "";
    switch (file.mimetype) {
      case "image/bmp":
        mimeType = "png";
        break;
      case "image/gif":
        mimeType = "png";
        break;
      case "image/jpeg":
        mimeType = "png";
        break;
      case "image/png":
        mimeType = "png";
        break;
      case "image/webp":
        mimeType = "png";
        break;
      default:
        mimeType = "png";
    }
    cb(null, `${Math.random().toString(36).substring(2, 12)}_${Date.now()}.${mimeType}`);
  },
});

// 사용될 미들웨어
export const boardImg = multer({
  storage: boardImageUrl,
});

export const avatarImg = multer({
  storage: avatarImageUrl,
});
