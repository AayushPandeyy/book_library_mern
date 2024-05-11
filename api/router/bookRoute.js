import express from "express";
import BookController from "../controller/BookController.js";

const bookRoute = express.Router();

const bookInstance = new BookController();


bookRoute.post("/",bookInstance.store);
bookRoute.get("/",bookInstance.index);
bookRoute.delete("/:id",bookInstance.destroy);

export default bookRoute;