// ---------------------------------------------------Imports----------------------------------------------
import mongoose from "mongoose";
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
const { Schema } = mongoose;
// ---------------------------------------------------------------------------------------------------------

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, "Task Name is a required field"],
  },
  mrnNumber: {
    type: String,
  },
  status1: {
    type: String,
    // enum: ["SUBMITTED_TO_CASE_MANAGER", "SUBMITTED_WITH_SIGNATURE", "REOPENED"],
  },
  status2: {
    type: String,
    // enum: ["APPROVED", "RETURNED", "PENDING", "HOLD", "UNHOLD"],
  },
  insurance: {
    type: String,
  },
  communicationComments: [
    {
      type: String,
    },
  ],
  // patientFirstName: {
  //   type: String,
  //   required: [true, "Patient First Name is a required field"],
  // },
  // patientLastName: {
  //   type: String,
  //   required: [true, "Patient Last Name is a required field"],
  // },
  // targetDate: {
  //   type: Date,
  // },

  // providerLast: {
  //   type: String,
  // },
  // providerFirst: {
  //   type: String,
  // },

  // priority: {
  //   type: String,
  //   enum: ["MEDIUM", "HIGH", "CRITICAL"],
  // },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "employee",
  },
  // ageOfRecord: {
  //   type: Date, //targetdate - todaysdate = age of record
  // },
  currentCapacity: {
    type: Number,
    required: true,
  },
  assignedCapacity: [
    {
      assignedEmployeeId: {
        type: Schema.Types.ObjectId,
        ref: "employee",
      },
      capacity: {
        type: String,
      },
    },
  ],
  taskTracker: [
    {
      date: {
        type: Date,
      },
      name: {
        type: String,
      },
      employeeId: {
        type: Schema.Types.ObjectId,
      },
      whereTowhere: {
        from: {
          type: String,
        },
        to: {
          type: String,
        },
        reason: {
          type: String,
        },
      },
    },
  ],
  taskTrackerField: {
    type: String,
    enum: [
      "WORKFLOW",
      "APPROVALS",
      "RETURNED",
      "PENDING",
      "PLEASE_QA",
      "COMMUNICATIONS",
    ],
    default: "WORKFLOW",
  },
});

export const noteTakerTaskModel = mongoose.model("noteTakerTask", taskSchema);
