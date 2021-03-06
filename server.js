const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workoutModel");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDatadb", { useNewUrlParser: true });

app.get("/stats", (req,res)=>{
  res.sendFile(path.join(__dirname, "./public/stats.html"));
})

app.get("/exercise", (req,res)=>{
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
})

app.get("/api/workouts/range", (req,res)=>{
  Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
})

app.get("/api/workouts", (req, res)=>{
  Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
})

app.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {

  Workout.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        exercises: req.body
      }
    },
  (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});