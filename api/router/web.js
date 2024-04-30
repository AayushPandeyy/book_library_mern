import express from "express";
import bookRoute from "./bookRoute.js";
import userRoute from "./userRoute.js";

const webRouter = express.Router();

webRouter.get("/", (req, res) => {
  res.send("Working fine");
});

webRouter.use("/book", bookRoute);
webRouter.use("/user", userRoute);

export default webRouter;
