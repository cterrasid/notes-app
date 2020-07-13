import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateUser() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    res.data.length === 0 ? setIsEmpty(true) : setUsers(res.data);
  };

  const onChangeUsername = e => {
    setNewUser(e.target.value);
  };

  const onSubmitUsername = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/users", {
      username: newUser
    });
    setNewUser("");
    getData();
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    getData();
  };

  return (
    <section className="row">
      <section className="col-md-4">
        <div className="card card-body">
          <h3>Create new member</h3>
          <form onSubmit={onSubmitUsername}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                value={newUser}
                onChange={onChangeUsername}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </section>
      <section className="col-md-8">
        {isEmpty
          ? <h1 className="text-center">There's no members! Create one!</h1>
          : <ul className="list-group">
              {users.map(user =>
                <li
                  className="list-group-item list-group-item-action d-flex justify-content-between"
                  key={user._id}
                >
                  {user.username}
                  <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                </li>
              )}
            </ul>}
      </section>
    </section>
  );
}
