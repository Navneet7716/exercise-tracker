import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

export default function ButtonAppBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Exercise Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link to="/" className="nav-item active">
              <li className="nav-link">Exercises</li>
            </Link>
            <Link to="/create" className="nav-item active">
              <li className="nav-link">Create Exercise Log</li>
            </Link>
            <Link to="/user" className="nav-item active">
              <li className="nav-link">Create User</li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}
