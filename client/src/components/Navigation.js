import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <section className="container">
        <Link className="navbar-brand" to="/">
          NotesApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <section className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create note
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Create user
              </Link>
            </li>
          </ul>
        </section>
      </section>
    </nav>
  );
}
