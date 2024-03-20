// --------------------------------------------------Imports--------------------------------------------------
import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------
const { Schema } = mongoose;
// -----------------------------------------------------------------------------------------------------------

const roleSchema = new Schema(
  {
    roleName: {
      type: "String",
      required: [true, "Role Name is a required field"],
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "employee",
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "permission",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const roleModel = mongoose.model("role", roleSchema);
