import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateNote() {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState({
    user: "",
    title: "",
    content: ""
  });
  const [date, setDate] = useState(new Date());
  const [noteId, setNoteId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUsers();
    getNoteById();
  }, []);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data.map(user => user.username));
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onSubmitNote = async e => {
    e.preventDefault();
    const { title, content, user } = inputValue;
    const newNote = {
      title: title,
      content: content,
      date: date,
      author: user
    };
    if (isEditing) {
      await axios.put(`http://localhost:4000/api/notes/${noteId}`, newNote);
    } else {
      await axios.post("http://localhost:4000/api/notes/", newNote);
    }

    window.location.href = "/";
  };

  const onChangeDate = dateSelected => {
    setDate(dateSelected);
  };

  const getNoteById = async () => {
    if (id) {
      const note = await axios.get(`http://localhost:4000/api/notes/${id}`);
      const { title, author, content, date } = note.data;

      setInputValue({
        user: author,
        title: title,
        content: content
      });
      setDate(new Date(date));
      setIsEditing(true);
      setNoteId(id);
    }
  };

  return (
    <section className="col-md-6 offset-md-3">
      <article className="card card-body">
        <h4>
          {isEditing ? "Edit note" : "Create a Note"}
        </h4>
        <form onSubmit={onSubmitNote}>
          <div className="form-group">
            <select
              className="form-control"
              name="user"
              value={inputValue.user}
              onChange={onInputChange}
            >
              <option defaultValue value="0">Select an author</option>
              {users.map(user =>
                <option key={user} value={user}>
                  {user}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Title"
              type="text"
              name="title"
              onChange={onInputChange}
              value={inputValue.title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="Content"
              cols="30"
              rows="10"
              onChange={onInputChange}
              value={inputValue.content}
              required
            />
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={date}
              onChange={onChangeDate}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </article>
    </section>
  );
}
