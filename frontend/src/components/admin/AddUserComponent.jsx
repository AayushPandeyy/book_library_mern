import React from "react";
import "../../css/AddUser.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API from "../../API.jsx";
import Swal from "sweetalert2";

const addUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  gender: yup.string().required(),
});

export default function AddUserComponent() {
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

  const addUser = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    API.post("/user/", formData, {
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
      <h2>Add User</h2>
      <form onSubmit={handleSubmit(addUser)}>
        <div className="form-group">
          <label htmlFor="name">
            Name
            <a className="text-danger">
              {errors.name?.message && <span>{errors.name?.message}</span>}
            </a>
          </label>
          <input type="text" name="name" {...register("name")} />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <a className="text-danger">
              {errors.email?.message && <span>{errors.email?.message}</span>}
            </a>
          </label>
          <input type="email" name="email" {...register("email")} />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <a className="text-danger">
              {errors.password?.message && (
                <span>{errors.password?.message}</span>
              )}
            </a>
          </label>
          <input type="password" name="password" {...register("password")} />
        </div>
        <div className="form-group">
          <label htmlFor="gender">
            Gender
            <a className="text-danger">
              {errors.gender?.message && <span>{errors.gender?.message}</span>}
            </a>
          </label>
          <select name="gender" {...register("gender")}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit">
          Add User
        </button>
      </form>
    </div>
  );
}
