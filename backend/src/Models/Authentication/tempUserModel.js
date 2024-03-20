// User's Model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      require: [true, "Name is required"],
      minLength: [2, "Name should contain minimum 2 and maximum 15 characters"],
      maxLength: [
        30,
        "Name should contain minimum 2 and maximum 15 characters",
      ],
    },
    userName: {
      type: String,
      trim: true,
      require: [true, "User Name is required"],
      minLength: [
        2,
        "User Name should contain minimum 2 and maximum 15 characters",
      ],
      maxLength: [
        30,
        "User Name should contain minimum 2 and maximum 15 characters",
      ],
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
      trim: true,
      require: [true, "Phone number is required"],
    },
    email: {
      type: String,
      trim: true,
      require: [true, "Email is required"],
      lowercase: true,
    },
    permissions: {
      type: [String],
      required: true,
    },
    disabled: Boolean,
    avatar: String,
    creations: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
        default: null,
      },
    ],
    // assignedCategories: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "course",
    //     default: null,
    //   },
    // ],
    // assignedStudyMaterial: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "studyMaterial",
    //     default: null,
    //   },
    // ],
  },
  { timestamps: true }
);
const tempUserModel = mongoose.model("tempUser", userSchema, "tempUser");
export default tempUserModel;
