//import { CreateUserDto } from "src/routes/dto/create-individual.dto";
import { dataSource, db } from "./index.schema";
import { positonEnum, Resume } from "./schemas/index.schema";
import { updateData, insertData } from "./utils/transData";

// 이력서
// 1. 이력서 (틀) 생성
export const createResumeQ = async (id: number, newName: string) => {
    const newResume = await db.query(`INSERT INTO resume(usedUserId, name) VALUES (?,?)`, [id, newName]);

    return newResume;
};

// 2-2. 내 이력서 목록 조회
export const findResumeListQ = async (userId: number) => {
    const myResumeList = await db.query(`SELECT * FROM resume WHERE usedUserId=?`, userId);

    return myResumeList;
};

// 2-3. 이력서 상세 조회
export const findResumeQ = async (resumeId: number) => {
    const myResume = await db.query(`SELECT * FROM resume A JOIN user B ON A.usedUserId = B.id JOIN project C ON A.id = C.usedResumeId WHERE A.id = ?`, resumeId);

    return myResume;
};

// 업무경험
// 1. 업무경험 / 프로젝트 생성
export const createDetailQ = async (resumeId: number, createInfo: Record<string, string | number | boolean>, dbname: string) => {
    const [keys, values, arrValues] = insertData(createInfo);

    const newCareer = await db.query(`INSERT INTO ${dbname} (usedResumeId, ${keys.join(", ")}) VALUES (?, ${values.join(",")})`,  [resumeId, ...arrValues]);

    return newCareer;
};

// 2. 업무경험 / 프로젝트 조회
export const findDetailQ = async (detailId: number, dbname: string, type: string) => {
    if (type == "all") {
        if (dbname == "resume") {
            const details = await db.query(`SELECT * FROM ${dbname} WHERE id = ?`, detailId);

            return details;
        }
        const details = await db.query(`SELECT * FROM ${dbname} WHERE usedResumeId = ?`, detailId);

        return details;
    } else {
        const details = await db.query(`SELECT *
                                        FROM ${dbname}
                                        WHERE id = ?`, detailId);

        return details;
    }

    // return details;
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
