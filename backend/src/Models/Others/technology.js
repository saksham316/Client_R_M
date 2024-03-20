import mongoose from "mongoose";
const technologySchema = new mongoose.Schema(
  {
    technology: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("technology", technologySchema, "technology");
