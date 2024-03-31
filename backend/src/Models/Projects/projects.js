import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    projectId: {
      type: String,
      default: function () {
        const randomsCharcters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let projectCode = "";
   
        for (let i = 0; i < 10; i++) {
          const miscIndex = Math.floor(Math.random() * randomsCharcters.length);
          projectCode += randomsCharcters.charAt(miscIndex);
        }
   
        return `${this?.name?.slice(0, 4)}/${projectCode}`;
      },
    },
    requirements: {
      type: String,
      required: true,
    },
    documents: {
      type: String,
      // required: true,
    },

    technology: {
      type: mongoose.Types.ObjectId,
      ref: "technology",
    },
    deadline: {
      type: Date,
      // required: true,
    },

    assignedTo: {
      type: [{ type: mongoose.Types.ObjectId, ref: "employee" }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("projects", projectSchema, "projects");
