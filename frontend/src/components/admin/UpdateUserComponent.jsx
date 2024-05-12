import React, { useEffect, useState } from "react";
import "../../css/AddUser.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API from "../../API.jsx";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const addUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  gender: yup.string().required(),
});

export default function UpdateUserComponent() {
  const { id } = useParams();

  const [user, setUser] = useState([]);

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [gender, setGender] = useState("");
  let token = localStorage.getItem("token") ?? "";
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addUserSchema),
  });

  const getById = (id) => {
    API.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      // setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setGender(res.data.gender);
    });
  };

  const updateUser = (e) => {
    e.preventDefault();
    API.put(
      `/user/${id}`,
      { name, email, gender },
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
          window.location.href = "/admin/show-users";
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
      <h2>Update User</h2>
      <form method="post" onSubmit={updateUser}>
        <div className="form-group">
          <label htmlFor="name">
            Name
            <a className="text-danger">
              {errors.name?.message && <span>{errors.name?.message}</span>}
            </a>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <a className="text-danger">
              {errors.email?.message && <span>{errors.email?.message}</span>}
            </a>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">
            Gender
            <a className="text-danger">
              {errors.gender?.message && <span>{errors.gender?.message}</span>}
            </a>
          </label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit">
          Update
        </button>
      </form>
    </div>
  );
}
