import express from "express";
import LoginController from "../controller/LoginController.js";


const loginRouter = express.Router();
const loginInstance = new LoginController();

loginRouter.post("/",loginInstance.login);
loginRouter.get("/verify-token",loginInstance.tokenVerify);

export default loginRouter;