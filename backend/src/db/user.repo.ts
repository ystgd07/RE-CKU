import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { dataSource, db } from "./index.schema";
import { roleEnum, User } from "./schemas/index.schema";
import { updateData } from "./utils/transData";

export const findOneUser = async (data: number | string, reason?: string) => {
  let user = null;
  // 파라미터로 들어온 data 값이 num이면 id로 찾고, 아니면 email로 찾음
  switch (typeof data) {
    case "string":
      user = await db.query(`SELECT * FROM user WHERE email=?`, [data]);
      break;
    default:
      // user = await dataSource.getRepository(User).findOne({ where: { id: data } });
      user = await db.query(`SELECT * FROM user WHERE id=?`, [data]);
      break;
  }
  if (reason)
    user = await db.query(`SELECT id,username,email,phoneNumber,created,avatarUrl FROM user WHERE id=?`, [data]);
  return user[0][0];
};

export const createIndiUser = async (data: CreateUserDto) => {
  const { username, email, phoneNumber, password } = data;
  // const newUser = dataSource.getRepository(User).create({ ...data });
  const newUser = db.query(`INSERT INTO user(username,email,phoneNumber,password) VALUES(?,?,?,?)`, [
    username,
    email,
    phoneNumber,
    password,
  ]);

  return newUser;
};

export const updateUser = async (id: number, data: Record<string, string | boolean | number>): Promise<boolean> => {
  // const { phoneNumber, password, role, RT, active } = data;
  // const toUpdate = {
  //   ...(phoneNumber && { phoneNumber }),
  //   ...(password && { password }),
  //   ...(role && { role }),
  //   ...(RT && { RT }),
  //   ...(active && { active }),
  // };
  const [keys, values] = updateData(data);
  await db.query(`UPDATE user SET ${keys.join(", ")} WHERE id = ?`, [...values, id]);
  // typeORM 코드
  // await dataSource.getRepository(User).update(id, toUpdate);
  return true;
};
