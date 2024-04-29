import express from "express";
import BookController from "../controller/BookController.js";

const bookRoute = express.Router();

const bookInstance = new BookController();


bookRoute.post("/",bookInstance.store);

export default bookRoute;