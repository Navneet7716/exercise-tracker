/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let data = await axios.get("/exercises/");
        console.log(data.data.exercise);
        setExercises(data.data.exercise);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const deleteExercise = async (id) => {
    await axios.delete(`/exercises/${id}`);

    setExercises(exercises.filter((el) => el._id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-center">Logged Exercises</h1>
      <table className="table-light">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((currentExercise) => (
            <Exercise
              exercise={currentExercise}
              deleteExercise={deleteExercise}
              key={currentExercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Exercise = ({ exercise, deleteExercise, key }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + exercise._id}>
        <a className="btn btn-primary">Edit</a>
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-danger"
        onClick={() => {
          deleteExercise(exercise._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);
