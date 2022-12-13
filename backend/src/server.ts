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

// app.post("/", async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const user = dataSource.getRepository(Company).create({
//     name,
//   });
//   await dataSource.getRepository(Company).save(user);
//   return res.status(201).json({
//     msg: "ㅋㅋ 됐음",
//     data: user,
//   });
// });
// app.post("/skill", async (req: Request, res: Response) => {
//   const { name, used } = req.body;
//   const user = dataSource.getRepository(Skill).create({
//     name,
//   });
//   await dataSource.getRepository(Skill).save(user);
//   return res.status(201).json({
//     msg: "ㅋㅋ 됐음",
//     data: user,
//   });
// });
// app.post("/stack", async (req: Request, res: Response, next: NextFunction) => {
//   const { skill_name, company_id, resume_id } = req.body;
//   console.log(skill_name, company_id, resume_id);
//   try {
//     for (let i = 0; i < skill_name.length; i++) {
//       console.log("뭐지?");
//       const findSkillName = await dataSource.getRepository(Skill).findOne({ where: { name: skill_name[i] } });
//       const stack = dataSource.getRepository(Stack).create({ skill_id: findSkillName, company_id, resume_id });
//       await dataSource.getRepository(Stack).save(stack);
//     }
//     return res.status(201).json({
//       msg: "ㅋㅋ 추가 됐음",
//       data: skill_name,
//     });
//   } catch (err) {
//     next(err);
//   }
// });
// app.get("/", async (req: Request, res: Response) => {
//   const zz = await dataSource.getRepository(Company).find();
//   return res.status(200).json({
//     msg: "zz",
//     data: zz,
//   });
// });
// app.get("/skill", async (req: Request, res: Response) => {
//   const zz = await dataSource.getRepository(Skill).find();
//   return res.status(200).json({
//     msg: "zz",
//     data: zz,
//   });
// });
// app.put("/", async (req: Request, res: Response) => {
//   const { name, update, id } = req.body;
//   console.log(typeof name);
//   console.log(update);
//   const user = await dataSource.getRepository(Company).findOneBy({ id: Number(id) });
//   console.log(user);
//   dataSource.getRepository(Company).update(user, { name });
//   const aa = await dataSource.getRepository(Company).save(user);
//   console.log(aa);
//   return res.status(200).json({
//     msg: "OK",
//     data: user,
//   });
// });

export default app;
