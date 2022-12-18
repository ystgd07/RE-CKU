<<<<<<< HEAD
import { dataSource, db } from ".";
import { EmailAuth } from "./schemas";
import * as utils from ".";
=======
import { dataSource, db } from "./index.repo";
import { EmailAuth } from "./schemas/index.schema";
import * as utils from "./index.repo";
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
export const findOneAuthData = async (email: string) => {
  const data = await dataSource.getRepository(EmailAuth).findOne({ where: { email } });
  return data;
};
export const createAuthData = async (email: string, code: number) => {
  // const data = await db.query(`INSERT INTO user () VALUES ()`, [])
  const forAuthDB = dataSource.getRepository(EmailAuth).create({
    email,
    code,
  });
  await dataSource.getRepository(EmailAuth).save(forAuthDB);
  return forAuthDB;
};

export const updateAuthData = async (email: string, code: number) => {
  const target = await findOneAuthData(email);
  target.code = code;
  target.time = new Date();
  await dataSource.getRepository(EmailAuth).save(target);
  return;
};
