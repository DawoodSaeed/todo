const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Task name is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  creationTime: {
    type: Date,
    default: new Date(),
  },
  completionTime: {
    type: Date,
    required: [true, "Completion time is required"],
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
