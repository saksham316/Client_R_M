import mongoose from "mongoose";

export const reportsSchema = new mongoose.Schema(
  {
    sentBy: {
      type: mongoose.Schema.ObjectId,
      ref: "employee",
      required: true,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "projects",
      required: true,
    },
    report: {
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

export default mongoose.model("reports", reportsSchema, "reports");
