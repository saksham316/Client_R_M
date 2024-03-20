// ----------------------------------------------Imports------------------------------------------
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// ------------------------------------------------------------------------------------------------
const { Schema } = mongoose;

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
      required: [true, "User Name is a required field"],
      min: [6, "User Name must be of minimum 6 characters"],
      max: [30, "User Name must be of maximum 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    doj: {
      type: Date,
      required: true,
    },
    ctc: {
      required: true,
      type: Number,
    },
    processManager: {
      type: String,
      required: true,
      trim: true,
    },
    reportingManager: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://i.ibb.co/QN7GHWC/default-Avatar.jpg",
    },
    isAllDocumentsVerified: {
      required: true,
      type: Boolean,
      default: false,
    },
    department: {
      required: true,
      type: String,
      trim: true,
    },

    employeeCode: {
      required: true,
      type: String,
    },
    bank: {
      type: String,
      required: true,
      trim: true,
    },
    ifsc: {
      type: String,
    },
    accountNumber: {
      type: Number,
      //   required: true,
    },
    residentialAddress: {
      country: String,
      state: String,
      city: String,
    },
    permanentAddress: {
      country: String,
      state: String,
      city: String,
    },

    gender: {},
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
    permissions: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "permission",
        },
      ],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  //salt --  generate salt for the password
  const salt = await bcrypt.genSalt(10);

  //hashedPassword -- hashing the password
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

export const employeeModel = mongoose.model(
  "employee",
  employeeSchema,
  "employee"
);
