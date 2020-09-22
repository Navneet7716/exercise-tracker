const router = require("express").Router();
let User = require("../models/usermodel");

router.route("/").get(async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(400).json("There was an error while getting the users");
  }
});

router.route("/add").post(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

module.exports = router;
