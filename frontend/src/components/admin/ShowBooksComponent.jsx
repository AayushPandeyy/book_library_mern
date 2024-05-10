import React, { useEffect, useState } from "react";
import "../../css/ShowUsers.css";
import API from "../../API";
export default function ShowBooksComponent() {
  let token = localStorage.getItem("token") ?? "";
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getUser = () => {
    API.get("/book", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setBooks(response.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="beautiful-table-container">
      <h1>List of books</h1>
      <table className="beautiful-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.description}</td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
