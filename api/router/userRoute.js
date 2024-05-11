import express from "express";

import UserController from "../controller/UserController.js";

const userRoute = express.Router();

const userInstance = new UserController();

userRoute.get("/", userInstance.index);
userRoute.post("/", userInstance.store);
userRoute.delete("/:id", userInstance.destroy);

export default userRoute;
