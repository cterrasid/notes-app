import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/notes");
    setNotes(res.data);
  };

  const deleteNote = async id => {
    await axios.delete(`http://localhost:4000/api/notes/${id}`);
    getNotes();
  };

  return (
    <section className="row">
      {notes.map(note =>
        <section className="col-md-4 p-2" key={note._id}>
          <article className="card">
            <header className="card-header d-flex justify-content-between">
              <h5>
                {note.title}
              </h5>
              <Link to={`/edit/${note._id}`} className="btn btn-secondary">
                Edit
              </Link>
            </header>
            <section className="card-body">
              <p>
                {note.content}
              </p>
              <p>
                {note.author}
              </p>
              <p>
                {format(note.date)}
              </p>
            </section>
            <footer className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </footer>
          </article>
        </section>
      )}
    </section>
  );
}
