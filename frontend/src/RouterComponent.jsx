import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent.jsx";
import Dashboard from "./components/middleware/AdminRouteMiddleware.jsx";

export default function RouterComponent() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<LoginComponent></LoginComponent>}
        ></Route>
        <Route path="/admin" element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </div>
  );
}
