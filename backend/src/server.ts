import { dataSource } from "./db/index";
import express, { Request, Response, NextFunction } from "express";
import { Company } from "./db/schemas/company.entity";
import { Skill } from "./db/schemas/skill.entity";
import { Stack } from "./db/schemas/stacks.entity";

const app = express();

// CORS 에러 방지

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

export default app;
