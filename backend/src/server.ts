import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middlewares/error-handdler";
<<<<<<< HEAD
import { userRoute, boardRoute, rootRoute, commentRoute } from "./routes";
=======
import { userRoute, boardRoute, rootRoute, commentRoute } from "./routes/index.routes";
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
import cors from "cors";
import resumeRoute from "./routes/resume.routes";
const app = express();
app.use("/uploads", express.static("uploads"));
// CORS 에러 방지
app.use(cors());
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", rootRoute);
app.use("/users", userRoute);
app.use("/my-portfolio", resumeRoute);
app.use("/board", boardRoute);
app.use("/comments", commentRoute);

// 에러 미들웨어
app.use(errorHandler);

export default app;
