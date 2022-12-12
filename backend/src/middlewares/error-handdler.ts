import { Request, Response, NextFunction } from "express";
// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  // 터미널에 노란색으로 출력됨.
  console.log("### 에러 메시지 : ", error.message);
  const { message, name } = error;
  const status = Number(message.split(",")[0]);
  const msg = message.split(",")[1];
  console.log("\x1b[33m%s\x1b[0m", error.stack);

  // 에러는 400 코드의 JSON 형태로 프론트에 전달됨
  res.status(status).json({ status, msg });
};
