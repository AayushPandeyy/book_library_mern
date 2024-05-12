import Book from "../model/Book.js";

import dotenv from "dotenv";

dotenv.config();

class BookController {
  async store(req, res) {
    const book = new Book({
      ...req.body,
    });
    await book.save();
    res.status(201).json({ status: true, message: "Book saved successfully" });
  }

  async index(req, res) {
    const bookData = await Book.find({});
    res.json(bookData);
  }

  async destroy(req, res) {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    return res.status(201).json({ status: "true", message: "Book deleted" });
  }
  async update(req, res) {
    let id = req.params.id;
    const { title, author, genre, description } = req.body;

    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, genre, description },
        { new: true }
      );
      if (!updatedBook) {
        return res.status(404).send("Book not found");
      }

      return res.status(201).json({ status: true, message: "Success" });
    } catch (error) {
      console.log(error);
    }
  }

  async getById(req, res) {
    let id = req.params.id;
    const book = await Book.findById(id);
    return res.json(book);
  }
}

export default BookController;
