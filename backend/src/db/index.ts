import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "express",
  password: "111111",
  database: "practice",
  port: 3306,
  entities: ["src/db/schemas/*.entity.ts"],
  logging: false,
  synchronize: true,
});
