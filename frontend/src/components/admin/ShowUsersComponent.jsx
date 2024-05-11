import React, { useEffect, useState } from "react";
import "../../css/ShowUsers.css";
import API from "../../API";
import Swal from "sweetalert2";

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
  const deleteUser = (id) => {
    API.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        getUser();
      })
      .catch((error) => {});
  };
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
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
