const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String },
  project: {
    type: Schema.Types.ObjectId,
    ref: "projects",
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  assigneedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "done"],
    default: "to-do",
  },
  category: {
    type: String,
    enum: ["feature", "issue"],
    default: "feature",
  },
  description: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

module.exports = mongoose.model("tasks", TaskSchema);
