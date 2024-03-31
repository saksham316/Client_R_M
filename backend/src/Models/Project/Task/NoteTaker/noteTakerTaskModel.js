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
  patientFirstName: {
    type: String,
    required: [true, "Patient First Name is a required field"],
  },
  patientLastName: {
    type: String,
    required: [true, "Patient Last Name is a required field"],
  },
  targetDate: {
    type: Date,
  },
  mrnNumber: {
    type: String,
  },
  providerLast: {
    type: String,
  },
  providerFirst: {
    type: String,
  },
  status1: {
    type: String,
    enum: ["SUBMITTED_TO_CASE_MANAGER", "SUBMITTED_WITH_SIGNATURE", "REOPENED"],
  },
  //   status2: {
  //     type: String,
  //     enum: ["APPROVED", "RETURNED", "PENDING", "HOLD", "UNHOLD"],
  //   },no need
  insurance: {
    type: String,
  },
  communicationComments: [
    {
      type: String,
    },
  ],
  priority: {
    type: String,
    enum: ["MEDIUM", "HIGH", "CRITICAL"],
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "employee",
  },
  ageOfRecord: {
    type: Date, //targetdate - todaysdate = age of record
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
    enum: ["workflow", "communication", "approval", "returned", "pending"],
  },
  taskSubData: {
    coding: {
      type: String,
    },
    oasis: {
      type: String,
    },
    foc: {
      type: String,
    },
  },
  isHold: {
    type: Number,
  }, // when moving any to hold stage increaser the count value is hold greater than 2 then    notification to the consent manager when hold notification is sent convrt the hold to 0 again
  isDumpTime: {
    type: Number,
  }, // start when a manager assigns a particualar task to an employee, after 50 days reset and goes to dump
  isCompleted: {
    type: Boolean,
  }, //when record goes from qa to submission then it is marked as true and is one time thing
  // isTouched:,//
  // capacity:
});

export const noteTakerTaskModel = mongoose.model("noteTakerTask", taskSchema);
