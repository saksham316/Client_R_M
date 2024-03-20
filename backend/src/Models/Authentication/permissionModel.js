// --------------------------------------------------Imports--------------------------------------------------
import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------
const { Schema } = mongoose;
// -----------------------------------------------------------------------------------------------------------

const permissionSchema = new Schema(
  {
    permissionName: {
      type: "String",
      required: [true, "Permission Name is a required field"],
      unique: true,
    },
    createdBy: {
      type:Schema.Types.ObjectId,
      ref:"employee",
    },
  },
  { timestamps: true }
);

export const permissionModel = mongoose.model("permission", permissionSchema);
