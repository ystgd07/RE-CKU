import express from "express";
import { tokenValidator } from "../middlewares/verify-JWT";

const boardRoute = express();
boardRoute.get("/", tokenValidator, (req, res) => {
  console.log("바디 잘담기나");
  console.log("바디 잘담기나", req.body);
  return res.send("zz");
});
export default boardRoute;
