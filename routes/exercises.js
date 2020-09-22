const router = require("express").Router();
let Exercise = require("../models/excersise.model");

router.route("/").get(async (req, res) => {
  try {
    let exercise = await Exercise.find();
    res.status(200).json({ exercise });
  } catch (err) {
    console.log(err);
    res.status(400).json("There was an error while getting the exercise");
  }
});

router.route("/add").post(async (req, res) => {
  try {
    const newExercise = await Exercise.create(req.body);
    res.status(201).json(newExercise);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    let exercise = await Exercise.findById(req.params.id);
    res.status(200).json(exercise);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    let exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json(exercise);
  } catch (er) {
    console.log(er);
    res.status(400).json(er);
  }
});

router.route("/:id").patch(async (req, res) => {
  try {
    let exercise = await Exercise.findById(req.params.id);

    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = req.body.duration * 1;
    exercise.date = Date.parse(req.body.date);
    try {
      await exercise.save();
      res.status(200).json("Updated");
    } catch (err) {
      res.status(400).json(err);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
