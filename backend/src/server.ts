import { dataSource } from "./db/index";
import express, { Request, Response, NextFunction } from "express";
import { Company } from "./db/schemas/company.entity";
import { Skill } from "./db/schemas/skill.entity";

const app = express();

// CORS 에러 방지

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = dataSource.getRepository(Company).create({
    name,
  });
  await dataSource.getRepository(Company).save(user);
  return res.status(201).json({
    msg: "ㅋㅋ 됐음",
    data: user,
  });
});
app.post("/skill", async (req: Request, res: Response) => {
  const { name, used } = req.body;
  const user = dataSource.getRepository(Skill).create({
    name,
  });
  await dataSource.getRepository(Skill).save(user);
  return res.status(201).json({
    msg: "ㅋㅋ 됐음",
    data: user,
  });
});
app.get("/", async (req: Request, res: Response) => {
  const zz = await dataSource.getRepository(Company).find();
  return res.status(200).json({
    msg: "zz",
    data: zz,
  });
});
app.get("/skill", async (req: Request, res: Response) => {
  const zz = await dataSource.getRepository(Skill).find({ relations: ["used"] });
  return res.status(200).json({
    msg: "zz",
    data: zz,
  });
});
app.put("/", async (req: Request, res: Response) => {
  const { name, update, id } = req.body;
  console.log(typeof name);
  console.log(update);
  const user = await dataSource.getRepository(Company).findOneBy({ id: Number(id) });
  console.log(user);
  dataSource.getRepository(Company).update(user, { name });
  const aa = await dataSource.getRepository(Company).save(user);
  console.log(aa);
  return res.status(200).json({
    msg: "OK",
    data: user,
  });
});

export default app;
