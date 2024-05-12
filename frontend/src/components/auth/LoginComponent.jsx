import React, { useState } from "react";
import "../../css/Login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../../API.jsx";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function LoginComponent() {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const login = (data) => {
    API.post("/login", data)
      .then((response) => {
        if (response.data.emailError) {
          setError("email", {
            type: "manual",
            message: response.data.emailError,
          });
        } else if (response.data.passwordError) {
          setError("password", {
            type: "manual",
            message: response.data.passwordError,
          });
        } else {
          let token = response.data.token;
          localStorage.setItem("token", token);
          window.location.href = "/admin";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleSubmit(login)}>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <a className="text-danger">
              {errors.email?.message && <span>{errors.email?.message}</span>}
            </a>
          </label>
          <input type="text" id="email" {...register("email")} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
}
