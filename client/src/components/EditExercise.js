import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

export default function EditExercise(props) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangedescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeduration = (e) => {
    setDuration(e.target.value);
  };
  const onChangedate = (date) => {
    setDate(date);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
    await axios.patch(`/exercises/${props.match.params.id}`, exercise);

    window.location = "/";
  };

  useEffect(() => {
    async function getData() {
      try {
        let data = await axios.get("/exercises/" + props.match.params.id);

        setUsername(data.data.username);
        setDescription(data.data.description);
        setDuration(data.data.duration);
        setDate(new Date(data.data.date));
        console.log(data);
      } catch (err) {
        console.log(err);
      }

      let data = await axios.get("/users");
      console.log(data.data);
      if (data.data.users.length > 0) {
        setUsers(data.data.users.map((user) => user.username));
        setUsername(data.data.users[0].username);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <div className="container mt-5 border border-dark p-5">
        <h1 className="text-center mb-5">Edit a Exercise Log</h1>
        <form className="form-ex" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <select
              className="form-control"
              id="username"
              value={username}
              onChange={onChangeUsername}
              required
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={onChangedescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (Min)</label>
            <input
              type="number"
              className="form-control"
              id="Duration"
              value={duration}
              onChange={onChangeduration}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <DatePicker selected={date} onChange={onChangedate} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
