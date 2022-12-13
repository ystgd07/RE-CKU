import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { dataSource } from ".";
import { roleEnum, User } from "./schemas";

export const findOneUser = async (data: number | string) => {
  let user = null;
  // 파라미터로 들어온 data 값이 num이면 id로 찾고, 아니면 email로 찾음
  switch (typeof data) {
    case "string":
      user = await dataSource.getRepository(User).findOne({ where: { email: data } });
      break;
    default:
      user = await dataSource.getRepository(User).findOne({ where: { id: data } });
  }

  return user;
};

export const createIndiUser = async (data: CreateUserDto) => {
  const newUser = dataSource.getRepository(User).create({ ...data, role: roleEnum.USER });
  await dataSource.getRepository(User).save(newUser);
  return newUser;
};

export const createCompanyUser = async (data: CreateUserDto) => {
  const newUser = dataSource.getRepository(User).create({ ...data, role: roleEnum.COMPANY });
  await dataSource.getRepository(User).save(newUser);
  // company 정보도 추가해야함
  return newUser;
};

export const updateUser = async (id: number, data: any) => {
  await dataSource.getRepository(User).update(id, { ...data });
  return;
};
