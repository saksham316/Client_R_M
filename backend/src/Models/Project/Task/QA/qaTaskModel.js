// ---------------------------------------------------Imports----------------------------------------------
import mongoose from "mongoose";
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
const { Schema } = mongoose;
// ---------------------------------------------------------------------------------------------------------

const qaTaskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, "Task Name is a required field"], // sheet
  },
  patientFirstName: {
    type: String,
    required: [true, "Patient First Name is a required field"], // sheet
  },
  patientLastName: {
    type: String,
    required: [true, "Patient Last Name is a required field"], // sheet
  },
  targetDate: {
    type: Date, // sheet
  },
  mrnNumber: {
    type: String, // sheet
  },
  providerLast: {
    type: String, // sheet
  },
  providerFirst: {
    type: String, // sheet
  },
  status1: {
    type: String,
    enum: ["SUBMITTED_TO_CASE_MANAGER", "SUBMITTED_WITH_SIGNATURE", "REOPENED"], // sheet
  },
  //   status2: {
  //     type: String,
  //     enum: ["APPROVED", "RETURNED", "PENDING", "HOLD", "UNHOLD"],
  //   },no need
  insurance: {
    type: String, // sheet
  },
  ageOfRecord: {
    type: String, //targetdate - todaysdate = age of record
  },
  communicationComments: [
    {
      title: {
        type: String,
      },
      description: { type: String },
    },
  ],
  priority: {
    type: String,
    enum: ["MEDIUM", "HIGH", "CRITICAL"], // calculate based on age of record for coder not editable and for manager it is   ----> age of record below 10 low ||  11 - 20 --> high || greater 20 - critical
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "employee", // middleware (coder qa manager role can access this task and obvious super admin)
  },
  taskTrackerField: {
    type: String,
    enum: ["WORKFLOW", "SUBMISSIONS", "HOLD", "UNDER_QA", "COMMUNICATIONS"],
    default: "WORKFLOW",
  },
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
        ref: "coderTask",
      },
      whereTowhere: {
        from: {
          type: String,
        },
        to: {
          type: String,
        },
        reason: {
          type: String, // calculate hold will have tags and for others it will be custom
        },
      },
    },
  ],
  taskSubData: {
    coding: {
      type: String,
    },
    oasis: {
      type: String,
    },
    poc: {
      type: String,
    },
    qa: {
      type: String,
    },
  },
  isHold: {
    type: Number,
  }, // when moving any to hold stage increases the count value is hold greater than 2 then    notification to the consent manager when hold notification is sent convrt the hold to 0 again
  isDumpTime: {
    type: Number,
  }, // start when a manager assigns a particualar task to an employee, after 50 days reset and goes to dump
  isCompleted: {
    type: Boolean,
  }, //when record goes from qa to submission then it is marked as true and is one time thing
  // isTouched:,//
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "employee",
  },
});

export const qaTaskModel = mongoose.model("qaTask", qaTaskSchema);
