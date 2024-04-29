import Book from "../model/Book";

import dotenv from "dotenv";


class BookController{
    async store(req,res){
        const book = new Book({
            ...req.body
        });
        await book.save();
        res.status(201).json({status : true , message: "Book saved successfully"});
    }
}