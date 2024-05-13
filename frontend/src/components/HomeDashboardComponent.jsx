import React from "react";
import "../css/UserDashboard.css";
const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel set in the American South during the 1930s, dealing with the issues of racial injustice and moral growth.",
    genre: "Fiction",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A novel set in the Roaring Twenties, portraying the American Dream and its corruption.",
    genre: "Classic",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel depicting a totalitarian regime and the dangers of mass surveillance.",
    genre: "Science Fiction",
    coverImage: "https://via.placeholder.com/150",
  },
];
export default function HomeDashboardComponent() {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div key={index} className="book-card">
          <img src={book.coverImage} alt={book.title} className="book-cover" />
          <div className="book-details">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-description">{book.description}</p>
            <p className="book-genre">Genre: {book.genre}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
}
