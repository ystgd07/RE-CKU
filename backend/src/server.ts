import { dataSource } from "./db/index";
import express, { Request, Response, NextFunction } from "express";
// import { Company } from "./db/schemas/company.entity";
import { Skill } from "./db/schemas/skill.entity";
import { Stack } from "./db/schemas/stacks.entity";
import { errorHandler } from "./middlewares/error-handdler";
import userRoute from "./routes/user.route";

const app = express();

// CORS 에러 방지

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/users", userRoute);

// 에러 미들웨어
app.use(errorHandler);

export default app;
