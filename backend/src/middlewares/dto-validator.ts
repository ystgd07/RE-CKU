import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validateOrReject, ValidationError } from "class-validator";
// 미들웨어 정의
export function validateBody(schema: { new (): any }) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const target = plainToClass(schema, req.body);
    console.log(target);
    try {
      await validateOrReject(target, {
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: 400,
        msg: "fail",
        reason: {
          property: error[0].property,
          role: error[0].constraints,
          input: error[0].value,
        },
      });
    }
  };
}

export const validateQuery = (req, res, next) => {};
export const validateParams = (req, res, next) => {};
