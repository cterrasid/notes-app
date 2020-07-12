import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateNote() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState({
    user: users[0],
    title: "",
    content: ""
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getUsers();
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

    await axios.post("http://localhost:4000/api/notes", newNote);
  };

  const onChangeDate = dateSelected => {
    setDate(dateSelected);
  };

  return (
    <section className="col-md-6 offset-md-3">
      <article className="card card-body">
        <h4>Create a Note</h4>
        <form onSubmit={onSubmitNote}>
          <div className="form-group">
            <select
              className="form-control"
              name="user"
              onChange={onInputChange}
            >
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
          <Link to="/">
            <button type="submit" className="btn btn-primary">
              Save Note
            </button>
          </Link>
        </form>
      </article>
    </section>
  );
}
