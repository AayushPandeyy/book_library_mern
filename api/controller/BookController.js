import Book from "../model/Book.js";

import dotenv from "dotenv";

dotenv.config();


class BookController{
    async store(req,res){
        const book = new Book({
            ...req.body
        });
        await book.save();
        res.status(201).json({status : true , message: "Book saved successfully"});
    }

    async index(req,res){
        const bookData = await Book.find({});
        res.json(bookData);
    }

    async destroy(req,res){
        let id = req.params.id;
        await Book.findByIdAndDelete(id);
        return res.status(201).json({status : "true",message : "Book deleted"});
    }
}

export default BookController; 