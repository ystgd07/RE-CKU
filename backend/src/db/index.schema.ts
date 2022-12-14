import { DataSource } from "typeorm";
require("dotenv").config();

export const dataSource = new DataSource({
  type: "mysql",
  host: "13.124.107.224",
<<<<<<< HEAD:backend/src/db/index.ts
  username: "user6",
  password: process.env.MYSQL_PW || "11111",
=======
  username: "team6",
  password: "11111",
>>>>>>> 81c54062f97a26bab8e85a8df7a800ece1dd3e44:backend/src/db/index.schema.ts
  database: "company",
  port: 3306,
  entities: ["src/db/schemas/*.entity.ts"],
  logging: false,
  synchronize: true,
});

export * from "./auth.repo";
export * from "./user.repo";
