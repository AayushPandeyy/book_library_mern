import "../../css/Admin.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import API from "../../API.jsx";

import { useNavigate } from "react-router-dom";

export default function DashboardComponent() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  let token = localStorage.getItem("token") ?? "";
  const checkToken = () => {
    API.get("/login/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.status) {
          setIsLogin(true);
          setIsLoading(false);
        } else {
          setIsLogin(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {});
  };

  //   const getProfile = () => {
  //     API.get("/user/profile", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => {
  //         setUser(response.data);
  //       })
  //       .catch((error) => {});
  //   };
  useEffect(() => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    const role = payload.role;
    if (role == "admin") {
      checkToken();
    } else {
      navigate("/");
    }
    // getProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>What would you like to do?</p>
      <div className="dashboard-actions">
        <div className="action">
          <h2>Add</h2>
          <p>Add a new book or user to the system.</p>
          <div className="action-links">
            <Link to="/admin/add-book" className="dashboard-link">
              Add Book
            </Link>
            <Link to="/admin/add-user" className="dashboard-link">
              Add User
            </Link>
          </div>
        </div>
        <div className="action">
          <h2>View</h2>
          <p>View the list of books or users in the system.</p>
          <div className="action-links">
            <Link to="/admin/show-books" className="dashboard-link">
              List Books
            </Link>
            <Link to="/admin/show-users" className="dashboard-link">
              List Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
