import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  username: "root",
  password: "1111",
  database: "company",
  port: 3306,
  entities: ["src/db/schemas/*.entity.ts"],
  logging: false,
  synchronize: true,
});
