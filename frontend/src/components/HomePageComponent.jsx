import React, { useState, useEffect } from "react";
import API from "../API.jsx";
import { useNavigate } from "react-router-dom";
import "../css/homePage.css";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function HomePageComponent() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") ?? "";

  const history = useNavigate();

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
          history("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkToken = () => {
    API.get("/login/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.status) {
          history("/home");
          setLoading(false);
        } else {
          history("/");
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (token) {
      checkToken();
    } else {
      setLoading(false);
      history("/");
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="login-container-home">
        <div className="login-box-home">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleSubmit(login)}>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" {...register("email")} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    );
  }
}
