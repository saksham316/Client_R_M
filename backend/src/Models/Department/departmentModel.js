// --------------------------------------------------Imports--------------------------------------------------
import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------
const { Schema } = mongoose;

const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: [true, "Department Name is required"],
    trim:true
  },
});
export const departmentModel = mongoose.model("department", departmentSchema);
