import server from "./server";
require("dotenv").config();
import { dataSource } from "./db/index.schema";
dataSource
  .initialize()
  .then(() => {
    console.log("✅ DB Synchronized Complete");
  })
  .catch((err) => {
    console.log("Error :", err);
  });

const PORT = 5000;

server.listen(PORT, () => console.log("✅ Server Connecting Port, ", PORT));
