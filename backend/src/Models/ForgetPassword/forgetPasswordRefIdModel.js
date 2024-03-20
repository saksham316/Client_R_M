// --------------------------------------------------Imports--------------------------------------------------
import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------
const { Schema } = mongoose;

const refIdSchema = new Schema({
  refId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
});
export const refIdModel = mongoose.model(
  "ForgetPasswordRefId",
  refIdSchema,
  "ForgetPasswordRefId"
);

