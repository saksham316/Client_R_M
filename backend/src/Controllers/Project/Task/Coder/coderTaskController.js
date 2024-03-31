// ----------------------------------------------Imports--------------------------------------------------------
import { coderTaskModel } from "../../../../Models/Project/Task/Coder/coderTaskModel.js";
import { pick } from "lodash-es";
import moment from "moment";
import { employeeModel } from "../../../../Models/Authentication/employeeModel.js";
import mongoose from "mongoose";
// -------------------------------------------------------------------------------------------------------------
// ------------------------------------------------Functions----------------------------------------------------
// priorityChecker -- function to check the priority
const priorityChecker = (ageOfRecord) => {
  if (ageOfRecord <= 10) {
    return "MEDIUM";
  } else if (ageOfRecord <= 20) {
    return "HIGH";
  } else if (ageOfRecord > 20) {
    return "CRITICAL";
  } else {
    return 0;
  }
};
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------

// @desc - creating a new task
// @route - POST /admin/task/coder
// @access - public
export const createCoderTask = async (req, res) => {
  try {
    if (!req?.body?.payload) {
      return res.status(500).json({
        success: false,
        message: `Payload is required`,
      });
    }

    let payload = pick(req?.body?.payload, [
      "taskName",
      "patientFirstName",
      "patientLastName",
      "targetDate",
      "mrnNumber",
      "providerLast",
      "providerFirst",
      "status1",
      "insurance",
      // "communicationComments",
      // "priority",
      // "employeeId",
      // "ageOfRecord",
      // "taskTracker",
      // "taskTrackerField",
      // "taskSubData",
      // "isHold",
      // "isDumpTime",
      // "isCompleted",
    ]);

    let targetDate = moment().format(
      payload?.targetDate?.toString().split("/").reverse().join("-")
    );

    // ageOfRecord -- targetDate - todaysDate
    const ageOfRecord = moment(targetDate).diff(Date.now(), "days");

    // priority --
    const priority = priorityChecker(ageOfRecord);

    payload = {
      ...payload,
      targetDate,
      ageOfRecord,
      priority,
      createdBy: req?.userId,
    };

    const doc = new coderTaskModel(payload);
    const taskDoc = await doc.save();

    const taskId = JSON.parse(JSON.stringify(taskDoc?._id));

    const user = await employeeModel.findByIdAndUpdate(
      { _id: req?.userId },
      { $addToSet: { assignedTasks: [taskId] } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Coder Task Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
// @desc - updating the coder task
// @route - PATCH /admin/task/coder/:coderTaskId
// @access - public
export const updateCoderTask = async (req, res) => {
  try {
    const { coderTaskId } = req?.params;

    let payload = req?.body?.payload;

    if (!coderTaskId) {
      return res.status(400).json({
        success: false,
        message: "Coder Task Id is required",
      });
    }

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: `Payload is required`,
      });
    }

    if (payload?.trackerFlag) {
      let currentDate = moment().toISOString();
      let name = req?.userName;
      let employeeId = req?.userId;
      console.log("this is the payload", payload);
      let taskTracker = {
        date: currentDate,
        name,
        employeeId,
        whereTowhere: {
          from: payload?.from,
          to: payload?.taskTrackerField,
          reason: payload?.reason || "",
        },
      };
      const coderTaskDoc = await coderTaskModel.findByIdAndUpdate(
        { _id: coderTaskId },
        {
          $set: { taskTrackerField: payload?.taskTrackerField },
          $addToSet: { taskTracker },
        },
        {
          new: true,
        }
      );
    } else if (payload?.communicationDetailsFlag) {
      const coderTaskDoc = await coderTaskModel.findByIdAndUpdate(
        { _id: coderTaskId },
        {
          $addToSet: { communicationComments: payload?.communicationComments },
        },
        {
          new: true,
        }
      );
    } else {
      const coderTaskDoc = await coderTaskModel.findByIdAndUpdate(
        { _id: coderTaskId },
        {
          $set: payload,
        },
        {
          new: true,
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Coder Task Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - fetching all the coder tasks only accessible by managers and admin
// @route - GET /admin/task/coder
// @access - public
export const getAllCoderTasks = async (req, res) => {
  try {
    const userId = req?.userId;

    const trackerField = req?.query?.trackerField
      ? req.query.trackerField.toString().trim().toUpperCase()
      : "";

    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 5;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide the User Id",
      });
    }

    let pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "codertasks",
          localField: "assignedTasks",
          foreignField: "_id",
          as: "populatedAssignedTasks",
        },
      },
      {
        $project: {
          _id: 1,
          populatedAssignedTasks: {
            $filter: {
              input: "$populatedAssignedTasks", // this is the array where we are applying filter
              as: "task", // accessing the array elements
              cond: {
                $eq: ["$$task.taskTrackerField", `${trackerField}`], // checking the array
              },
            },
          },
        },
      },
    ];

    if (trackerField) {
      const [result] = await employeeModel.aggregate(pipeline);
      return res.status(200).json({
        success: true,
        message: "Coder Tasks Found Successfully",
        data: {
          coderTasks: result?.populatedAssignedTasks,
        },
      });
    } else {
      const data = await employeeModel
        .findById({ _id: req?.userId })
        .populate("assignedTasks");

      return res.status(200).json({
        success: true,
        message: "Coder Tasks Found Successfully",
        data: {
          coderTasks: data?.assignedTasks,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - fetching the individual coder task
// @route - GET /admin/task/coder/:coderTaskId
// @access - public
export const getIndividualCoderTask = async (req, res) => {
  try {
    const { coderTaskId } = req.params;

    if (!coderTaskId) {
      return res.status(200).json({
        success: false,
        message: "Coder's Task Id is required",
      });
    }

    const data = await coderTaskModel.findById({ _id: coderTaskId });

    return res.status(200).json({
      success: true,
      message: "Coder Task Found Successfully",
      data: {
        coderTask: data,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @method - PATCH
// @desc - assigning the task to the coder
// @route - /admin/task/coder/assign/:coderId
export const assignCoderTasks = async (req, res) => {
  try {
    const { coderId } = req.params;

    const { tasks } = req.body.payload;

    if (!coderId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the coder id",
      });
    }

    if (!tasks) {
      return res.status(400).json({
        success: false,
        message: "Please provide the tasks for assigning",
      });
    }

    // occurrence -- checking the occurrences of the tasks assigned to the coder
    let occurrence = {};

    tasks.forEach((task) => {
      !occurrence[task] && (occurrence[task] = 1);
    });

    const remainingTasks = [];

    const user = await employeeModel.findByIdAndUpdate(
      { _id: coderId },
      { $addToSet: { assignedTasks: tasks } },
      { new: true }
    );

    const manager = await employeeModel.findOne({ _id: req?.userId });

    manager?.assignedTasks.forEach((task) => {
      if (!occurrence[task]) {
        remainingTasks.push(task);
      }
    });

    const managerUpdatedDoc = await employeeModel.findByIdAndUpdate(
      { _id: req?.userId },
      { $addToSet: { bucket: tasks }, $set: { assignedTasks: remainingTasks } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Task/Tasks Assigned Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
