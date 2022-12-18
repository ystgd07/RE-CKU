import server from "./server";
require("dotenv").config();

<<<<<<< HEAD
import { dataSource } from "./db";
=======
import { dataSource } from "./db/index.repo";
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
dataSource
  .initialize()
  .then(() => {
    console.log("✅ DB 테이블 생성 완료! (by TypeORM)");
  })
  .catch((err) => {
    console.log("Error :", err);
  });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("✅ Server Connecting Port, ", PORT));
