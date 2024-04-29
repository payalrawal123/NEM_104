const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    deadline: { type: Date },
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    recurring: { type: Boolean, default: false },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
  },
  {
    versionKey: false,
  }
);

const taskModel = mongoose.model("task2", taskSchema);

module.exports = {
  taskModel,
};
// "task": "task2",
//     "description": "hi i am person",
//     "priority": "medium",
//      "recurring": false,
//     "status": "completed"