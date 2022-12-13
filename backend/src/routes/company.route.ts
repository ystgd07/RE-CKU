import { dataSource } from "./../db/index";
import expess, { Request, Response, NextFunction } from "express";
import { Company } from "src/db/schemas/company.entity";
const companyRouter = expess();

companyRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const companyInfo = await dataSource.getRepository(Company).find();
  // 엔티티 stack 가 가지는 것 가져옴 어디서? Stack에서
  const companyStacks = await dataSource.getRepository(Company).find({ relations: { stacks: true } });
});

export default companyRouter;
