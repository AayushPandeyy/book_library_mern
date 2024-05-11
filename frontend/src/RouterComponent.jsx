import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent.jsx";
import DashboardComponent from "./components/admin/DashboardComponent.jsx";
import AddBookComponent from "./components/admin/AddBookComponent.jsx";
import AddUserComponent from "./components/admin/AddUserComponent.jsx";
import ShowUsersComponent from "./components/admin/ShowUsersComponent.jsx";
import Dashboard from "./components/middleware/AdminRouteMiddleware.jsx";
import ShowBooksComponent from "./components/admin/ShowBooksComponent.jsx";
import UpdateUserComponent from "./components/admin/UpdateUserComponent.jsx";

export default function RouterComponent() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<LoginComponent></LoginComponent>}
        ></Route>
        <Route path="/admin" element={<Dashboard></Dashboard>}>
          <Route
            path="/admin"
            element={<DashboardComponent></DashboardComponent>}
          ></Route>
          <Route
            path="/admin/add-user"
            element={<AddUserComponent></AddUserComponent>}
          ></Route>
          <Route
            path="/admin/add-book"
            element={<AddBookComponent></AddBookComponent>}
          ></Route>
          <Route
            path="/admin/show-users"
            element={<ShowUsersComponent></ShowUsersComponent>}
          ></Route>
          <Route
            path="/admin/show-books"
            element={<ShowBooksComponent></ShowBooksComponent>}
          ></Route>
          <Route
            path="/admin/update-user/:id"
            element={<UpdateUserComponent></UpdateUserComponent>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}
