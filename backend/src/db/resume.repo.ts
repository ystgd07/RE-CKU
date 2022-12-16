//import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { dataSource, db } from "./index.schema";
import { positonEnum, Resume } from "./schemas/index.schema";

export const findResumeList = async (data: any) => {
    // let user = null;
    // 파라미터로 들어온 data 값이 num이면 id로 찾고, 아니면 email로 찾음
    // switch (typeof data) {
    //     case "string":
    //         user = await db.query(`SELECT * FROM user WHERE email=?`, [data]);
    //         break;
    //     default:
    //         // user = await dataSource.getRepository(User).findOne({ where: { id: data } });
    //         user = await db.query(`SELECT * FROM user WHERE id=?`, [data]);
    // }
    const myresume = await db.query(`SELECT * FROM resume WHERE id=?`, 1122);
    console.log(myresume)
    return true;
};

export const createResumeQ = async (id: number) => {
    const newResume = await db.query(`INSERT INTO resume(usedUserId) VALUES (?)`, id);

    return newResume;
};

/*
export const findOneUser = async (data: number | string) => {
    let user = null;
    // 파라미터로 들어온 data 값이 num이면 id로 찾고, 아니면 email로 찾음
    switch (typeof data) {
        case "string":
            user = await db.query(`SELECT * FROM user WHERE email=?`, [data]);
            break;
        default:
            // user = await dataSource.getRepository(User).findOne({ where: { id: data } });
            user = await db.query(`SELECT * FROM user WHERE id=?`, [data]);
    }

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

//  const toUpdate = {
//     ...(name && { name }),
//     ...(password && { password }),
//     ...(address && { address }),
//     ...(phoneNumber && { phoneNumber }),
//   }; //
type UpdateData = {
    phoneNumber: string | undefined;
    password: string | undefined;
    role: roleEnum | undefined;
    RT: string | undefined;
    active: boolean | undefined;
};

export const updateUser = async (id: number, data: UpdateData) => {
    const { phoneNumber, password, role, RT, active } = data;
    const toUpdate = {
        ...(phoneNumber && { phoneNumber }),
        ...(password && { password }),
        ...(role && { role }),
        ...(RT && { RT }),
        ...(active && { active }),
    };

    console.log(toUpdate);
    // await db.query(`UPDATE user SET phoneNumber=?,  `,[])// 코치님께 질문
    await dataSource.getRepository(User).update(id, toUpdate);
    return;
}; */
