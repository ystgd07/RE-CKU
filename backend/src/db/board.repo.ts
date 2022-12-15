import { db } from "./index.schema";
import { updateData, insertData } from "./utils/transData";

//   const newUser = db.query(`INSERT INTO user(username,email,phoneNumber,password) VALUES(?,?,?,?)`, [

export const create = async (data: Record<string, string | number | boolean>): Promise<boolean> => {
  console.log("서비스가 받아온 data : ", data);
  const [keys, values, arrValues] = insertData(data);
  await db.query(`INSERT INTO board (${keys.join(", ")}) VALUES (${values.join(",")})`, [...arrValues]);
  return true;
};
