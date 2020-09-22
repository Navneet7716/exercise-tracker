const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("./client/build"));

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTION SUCCESSFUL 🔥"));

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
