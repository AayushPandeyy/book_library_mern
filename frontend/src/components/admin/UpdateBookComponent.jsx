import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API from "../../API.jsx";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import "../../css/AddUser.css";

const bookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  genre: yup.string().required(),
  description: yup.string().required(),
});

export default function UpdateBookComponent() {
  const { id } = useParams();

  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState([]);
  let token = localStorage.getItem("token") ?? "";
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookSchema),
  });

  const getById = (id) => {
    API.get(`/book/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      // setUser(res.data);
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setGenre(res.data.genre);
      setDescription(res.data.description);
    });
  };

  const updateBook = (e) => {
    e.preventDefault();
    API.put(
      `/book/${id}`,
      { title, author, genre, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "/admin/show-books";
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getById(id);
  }, []);
  return (
    <div className="form-container">
      <h2>Update Book</h2>
      <form method="post" onSubmit={updateBook}>
        <div className="form-group">
          <label htmlFor="title">
            Title
            <a className="text-danger">
              {errors.title?.message && <span>{errors.title?.message}</span>}
            </a>
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">
            Author
            <a className="text-danger">
              {errors.author?.message && <span>{errors.author?.message}</span>}
            </a>
          </label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">
            Genre
            <a className="text-danger">
              {errors.genre?.message && <span>{errors.genre?.message}</span>}
            </a>
          </label>
          <select
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
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
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          Update
        </button>
      </form>
    </div>
  );
}
