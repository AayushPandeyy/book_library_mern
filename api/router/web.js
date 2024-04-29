import express from "express";

const webRouter = express.Router();


webRouter.get('/',(req,res)=>{
    res.send("Working fine");
})

webRouter.use();