const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
      type: Date,
    default: Date.now
    },
    exercises: [{
      type: {
        type: String,
        trim: true,
        required: "Type is Required"
      },
      name: {
        type: String,
        trim: true,
        required: "Name is Required"
      },
      distance: {
        type: Number,
      },
      duration: {
        type: Number,
        trim: true,
        required: "Duration is Required"
      },
      weight: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },

}]},
    {
      toJSON: {
        virtuals: true
      }
});


// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  console.log(this.exercises)
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
  // console.log
  
});

const workoutData = mongoose.model("workoutData", workoutSchema);

module.exports = workoutData;
