// --------------------------------------------Imports--------------------------------------------------------
// import { noteTakerTaskModel } from "../../../../Models/Project/Task/NoteTaker/noteTakerTaskModel.js";
import { coderTaskModel } from "../../../../Models/Project/Task/Coder/coderTaskModel.js";
import mongoose from "mongoose";
import { employeeModel } from "../../../../Models/Authentication/employeeModel.js";
import moment from "moment";

// -----------------------------------------------------------------------------------------------------------

// @desc - fetching all the qa tasks only accessible by managers and admin
// @route - GET /admin/task/qa
// @access - public
export const getAllQATasks = async (req, res) => {
  try {
    const userId = req?.userId;

    let trackerField = req?.query?.trackerField
      ? req.query.trackerField.toString().trim().toUpperCase()
      : "";

    if (trackerField && trackerField === "WORKFLOW") {
      trackerField = "UNDER_QA";
    }

    let coderQATasks = [];

    let coderQATasksPipelineWithTrackerField = [
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
              input: "$populatedAssignedTasks",
              as: "task",
              cond: {
                $eq: ["$$task.taskTrackerField", trackerField],
              },
            },
          },
        },
      },
    ];

    // let noteTakerTaskPipeline = [
    //   {
    //     $match: {},
    //   },
    //   {
    //     $unwind: "$assignedCapacity",
    //   },
    //   {
    //     $match: {
    //       "assignedCapacity.taskTrackerField": "PLEASE_QA",
    //     },
    //   },
    // ];

    // const noteTakerQATasks = await noteTakerTaskModel.aggregate(
    //   noteTakerTaskPipeline
    // );

    if (trackerField) {
      const [result] = await employeeModel.aggregate(
        coderQATasksPipelineWithTrackerField
      );
      coderQATasks = result?.populatedAssignedTasks;
    } else {
      coderQATasks = await coderTaskModel.find({
        taskTrackerField: "UNDER_QA",
      });
    }

    console.log(coderQATasks);

    return res.status(200).json({
      success: true,
      message: "QA Tasks Found Successfully",
      data: {
        coderQATasks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - updating the qa task
// @route - PATCH /admin/task/qa/:qaTaskId
// @access - public
export const updateQATask = async (req, res) => {
  try {
    const { qaTaskId } = req?.params;

    let payload = req?.body?.payload;

    if (!qaTaskId) {
      return res.status(400).json({
        success: false,
        message: "QA Task Id is required",
      });
    }

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: `Payload is required`,
      });
    }

    if (payload?.trackerFlag) {
      if (payload?.taskTrackerField === "UNDER_QA") {
        let assignedToQA = false;

        const qaEmployees = await employeeModel.find({
          role: "2",
          subRole: "5",
        });

        for (let i = 0; i < qaEmployees.length; i++) {
          if (qaEmployees[i]?.assignedTasks < 10) {
            assignedToQA = true;
            const emp = await employeeModel.findByIdAndUpdate(
              { _id: qaEmployees[i]?._id },
              {
                $addToSet: { assignedTasks: coderTaskId },
              }
            );

            const task = await coderTaskModel.findByIdAndUpdate(
              { _id: coderTaskId },
              { $set: { assignedToQA } }
            );
            break;
          }
        }
      }

      let currentDate = moment().toISOString();
      let name = req?.userName;
      let employeeId = req?.userId;
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
      const qaTaskDoc = await coderTaskModel.findByIdAndUpdate(
        { _id: qaTaskId },
        {
          $set: { taskTrackerField: payload?.taskTrackerField },
          $addToSet: { taskTracker },
        },
        {
          new: true,
        }
      );
    } else if (payload?.communicationDetailsFlag) {
      let currentDate = moment().toISOString();
      let name = req?.userName;
      let employeeId = req?.userId;
      let taskTracker = {
        date: currentDate,
        name,
        employeeId,
        whereTowhere: {
          from: "UNDER_QA",
          to: "SUBMISSIONS",
          reason: payload?.reason || "",
        },
      };
      const qaTaskDoc = await coderTaskModel.findByIdAndUpdate(
        { _id: qaTaskId },
        {
          $set: { taskTrackerField: "SUBMISSIONS" },
          $addToSet: {
            communicationComments: payload?.communicationComments,
            taskTracker,
          },
        },
        {
          new: true,
        }
      );
    } else {
      const qaTaskDoc = await coderTaskModel.findByIdAndUpdate(
        { _id: qaTaskId },
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
      message: "QA Task Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
