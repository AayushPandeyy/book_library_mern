import React from "react";
import "../../css/AddBook.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API from "../../API.jsx";
import Swal from "sweetalert2";

const addBookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  description: yup.string().required(),
  genre: yup.string().required(),
});

export default function AddBookComponent() {
  let token = localStorage.getItem("token") ?? "";
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addBookSchema),
  });

  const addBook = (data) => {
    // let formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("author", data.author);
    // formData.append("description", data.description);
    // formData.append("genre", data.genre);
    API.post("/book/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit(addBook)}>
        <div className="form-group">
          <label htmlFor="title">
            Title
            <a className="text-danger">
              {errors.title?.message && <span>{errors.title?.message}</span>}
            </a>
          </label>
          <input type="text" title="title" {...register("title")} required/>
        </div>
        <div className="form-group">
          <label htmlFor="author">
            Author
            <a className="text-danger">
              {errors.author?.message && <span>{errors.author?.message}</span>}
            </a>
          </label>
          <input type="text" title="author" {...register("author")} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description
            <a className="text-danger">
              {errors.description?.message && (
                <span>{errors.description?.message}</span>
              )}
            </a>
          </label>
          <input
            type="text"
            title="description"
            {...register("description")} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">
            Genre
            <a className="text-danger">
              {errors.genre?.message && <span>{errors.genre?.message}</span>}
            </a>
          </label>
          <select title="genre" {...register("genre")} required>
            <option value="">Select Genre</option>
            <option value="male">Horror</option>
            <option value="female">Mystery</option>
            <option value="other">Sci-Fi</option>
          </select>
        </div>
        <button type="submit" className="submit">
          Add Book
        </button>
      </form>
    </div>
  );
}
