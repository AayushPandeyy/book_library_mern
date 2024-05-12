import React, { useEffect, useState } from "react";
import "../../css/ShowUsers.css";
import API from "../../API";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
export default function ShowBooksComponent() {
  let token = localStorage.getItem("token") ?? "";
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBook = () => {
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
    getBook();
  }, []);

  const deleteBook = (id) => {
    API.delete(`/book/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        getBook();
      })
      .catch((err) => {});
  };
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
                <Link
                    className="edit-button"
                    to={`/admin/update-book/${book._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
