import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateUser() {
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = { username: username };

    let data = await axios.post("/users/add", user);
    setUsername("");
    console.log(data);
  };

  return (
    <div>
      <div className="container mt-5 border border-dark p-5">
        <h1 className="text-center mb-5">Create a User</h1>
        <form className="form-ex" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
