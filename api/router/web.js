import express from "express";
import bookRoute from "./bookRoute.js";

const webRouter = express.Router();


webRouter.get('/',(req,res)=>{
    res.send("Working fine");
})

webRouter.use('/book',bookRoute);

export default webRouter;