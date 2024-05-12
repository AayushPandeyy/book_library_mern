import express from "express";
import BookController from "../controller/BookController.js";

const bookRoute = express.Router();

const bookInstance = new BookController();

bookRoute.post("/", bookInstance.store);
bookRoute.get("/", bookInstance.index);
bookRoute.delete("/:id", bookInstance.destroy);
bookRoute.get("/:id", bookInstance.getById);
bookRoute.put("/:id", bookInstance.update);

export default bookRoute;
