import React, { useEffect, useState } from "react";
import "../../css/ShowUsers.css";
import API from "../../API";

export default function ShowUsersComponent() {
  let token = localStorage.getItem("token") ?? "";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getUser = () => {
    API.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setUsers(response.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="beautiful-table-container">
      <h1>List of Users</h1>
      <table className="beautiful-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
