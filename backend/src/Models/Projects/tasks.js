import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "projects",
    },
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("tasks", taskSchema, "tasks");
