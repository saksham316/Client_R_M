// ----------------------------------------------Imports--------------------------------------------------------
import { noteTakerTaskModel } from "../../../../Models/Project/Task/NoteTaker/noteTakerTaskModel.js";
import { pick } from "lodash-es";
import moment from "moment";
import { employeeModel } from "../../../../Models/Authentication/employeeModel.js";
import mongoose from "mongoose";
// -------------------------------------------------------------------------------------------------------------

// @desc - creating a new task for noteTaker
// @route - POST /admin/task/noteTaker
// @access - public
export const createNoteTakerTask = async (req, res) => {
  try {
    if (!req?.body?.payload || !(req?.body?.payload.length > 0)) {
      return res.status(500).json({
        success: false,
        message: `Payload is required`,
      });
    }

    let payload = JSON.parse(JSON.stringify(req?.body?.payload));
    let taskArr = [];
    let resultTaskArr = [];
    let occ = {};
    for (let i = 0; i < payload.length; i++) {
      let pickedPayload = pick(payload[i], [
        "taskName",
        "mrnNumber",
        "date",
        "status1",
        "status2",
        "insurance",
      ]);
      if (
        occ[
          pickedPayload?.taskName
            ?.toString()
            ?.replaceAll(" ", "")
            ?.toLowerCase()
            ?.trim()
        ]
      ) {
        occ[
          pickedPayload?.taskName
            ?.toString()
            ?.replaceAll(" ", "")
            ?.toLowerCase()
            ?.trim()
        ]++;
      } else {
        occ[
          pickedPayload?.taskName
            ?.toString()
            ?.replaceAll(" ", "")
            ?.toLowerCase()
            ?.trim()
        ] = 1;

        taskArr.push(pickedPayload);
      }
    }

    for (let i = 0; i < taskArr.length; i++) {
      let taskName = taskArr[i]?.taskName
        ?.toString()
        ?.replaceAll(" ", "")
        .toLowerCase()
        .trim();

      resultTaskArr.push({
        ...taskArr[i],
        currentCapacity: occ[taskName],
        employeeId: req?.userId,
      });
    }

    const doc = await noteTakerTaskModel.insertMany(resultTaskArr);

    let taskIds = [];

    doc.forEach((task) => {
      taskIds.push(JSON.parse(JSON.stringify(task?._id)));
    });

    const user = await employeeModel.findByIdAndUpdate(
      { _id: req?.userId },
      { $addToSet: { assignedTasks: taskIds } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Note Taker Task Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - updating the note taker task
// @route - PATCH /admin/task/noteTaker/:noteTakerTaskId
// @access - public
export const updateNoteTakerTask = async (req, res) => {
  try {
    const { noteTakerTaskId } = req?.params;

    let userId = req?.userId;

    let payload = req?.body?.payload;

    if (!noteTakerTaskId) {
      return res.status(400).json({
        success: false,
        message: "Note Taker Task Id is required",
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
      // const coderTaskDoc = await coderTaskModel.findByIdAndUpdate(
      //   { _id: coderTaskId },
      //   {
      //     $set: { taskTrackerField: payload?.taskTrackerField },
      //     $addToSet: { taskTracker },
      //   },
      //   {
      //     new: true,
      //   }
      // );

      let noteTakerTaskDoc = await noteTakerTaskModel.findOne({
        _id: noteTakerTaskId,
      });

      let clonedNoteTakerTaskDoc = JSON.parse(JSON.stringify(noteTakerTaskDoc));

      if (clonedNoteTakerTaskDoc) {
        let assignedCapacity = JSON.parse(
          JSON.stringify(clonedNoteTakerTaskDoc?.assignedCapacity)
        );

        for (let i = 0; i < assignedCapacity?.length; i++) {
          if (assignedCapacity[i]?.assignedEmployeeId == `${userId}`) {
            assignedCapacity[i].taskTrackerField = payload?.taskTrackerField;
            assignedCapacity[i].taskTracker = [
              ...assignedCapacity[i]?.taskTracker,
              taskTracker,
            ];
            break;
          }
        }

        clonedNoteTakerTaskDoc = {
          ...clonedNoteTakerTaskDoc,
          assignedCapacity,
        };
      }

      await noteTakerTaskModel.findByIdAndUpdate(
        { _id: noteTakerTaskId },
        clonedNoteTakerTaskDoc,
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

// @desc - fetching all the noteTaker tasks only accessible by managers and admin and coders
// @route - GET /admin/task/noteTaker
// @access - public
export const getAllNoteTakerTasks = async (req, res) => {
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

    let pipelineWithTrackerField = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "notetakertasks",
          localField: "assignedTasks",
          foreignField: "_id",
          as: "populatedAssignedTasks",
        },
      },
      {
        $project: {
          _id: 1,
          populatedAssignedTasks: {
            $map: {
              input: "$populatedAssignedTasks",
              as: "task",
              in: {
                $mergeObjects: [
                  "$$task",
                  {
                    assignedCapacity: {
                      $filter: {
                        input: "$$task.assignedCapacity",
                        as: "cap",
                        cond: {
                          $eq: [
                            "$$cap.assignedEmployeeId",
                            new mongoose.Types.ObjectId(userId),
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ];
    let pipelineWithoutTrackerField = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "notetakertasks",
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
                $ne: ["$$task.currentCapacity", 0],
              },
            },
          },
        },
      },
    ];

    if (trackerField) {
      const [result] = await employeeModel.aggregate(pipelineWithTrackerField);
      
      let newResult = result?.populatedAssignedTasks.filter((task) => {
        return task?.assignedCapacity[0]?.taskTrackerField === trackerField;
      });
      console.log("entered here")

      return res.status(200).json({
        success: true,
        message: "Note Taker Tasks Found Successfully",
        data: {
          noteTakerTasks: newResult,
        },
      });
    } else {
      const [result] = await employeeModel.aggregate(
        pipelineWithoutTrackerField
      );

      return res.status(200).json({
        success: true,
        message: "Note Taker Tasks Found Successfully",
        data: {
          noteTakerTasks: result?.populatedAssignedTasks,
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

// @method - PATCH
// @desc - assigning the task to the coder
// @route - /admin/task/noteTaker/assign/:noteTakerId
export const assignNoteTakerTasks = async (req, res) => {
  try {
    const { noteTakerId } = req.params;

    const { tasks } = req.body.payload;

    if (!noteTakerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the note taker id",
      });
    }

    if (!tasks) {
      return res.status(400).json({
        success: false,
        message: "Please provide the tasks for assigning",
      });
    }

    const tasksArray = [];

    // looping the tasks whose capacity we got from the frontend
    for (let i in tasks) {
      tasksArray.push(i);

      const prevDoc = await noteTakerTaskModel.findById({ _id: i });

      const newDoc = JSON.parse(JSON.stringify(prevDoc));

      newDoc.currentCapacity -= Number(tasks[i]);

      let flag = false;

      if (newDoc?.assignedCapacity?.length > 0) {
        // looping the assigned capacity array such that there is no duplicacy on employee ids and only capcity increases
        for (let j = 0; j < newDoc.assignedCapacity.length; j++) {
          if (newDoc.assignedCapacity[j]?.assignedEmployeeId == noteTakerId) {
            newDoc.assignedCapacity[j].capacity =
              Number(newDoc.assignedCapacity[j].capacity) + Number(tasks[i]);
            flag = true;
            break;
          }
        }

        // if the employee is new thus we will append it to the existing assigned capacity array
        if (!flag) {
          newDoc.assignedCapacity = [
            ...newDoc.assignedCapacity,
            { assignedEmployeeId: noteTakerId, capacity: tasks[i] },
          ];
        }
      } else {
        newDoc.assignedCapacity = [
          { assignedEmployeeId: noteTakerId, capacity: tasks[i] },
        ];
      }

      const updatedDoc = await noteTakerTaskModel.findByIdAndUpdate(
        { _id: i },
        {
          ...newDoc,
        },
        {
          new: true,
        }
      );
    }

    const user = await employeeModel.findByIdAndUpdate(
      { _id: noteTakerId },
      { $addToSet: { assignedTasks: tasksArray } },
      { new: true }
    );

    // const manager = await employeeModel.findOne({ _id: req?.userId });

    // manager?.assignedTasks.forEach((task) => {
    //   if (!occurrence[task]) {
    //     remainingTasks.push(task);
    //   }
    // });

    // const managerUpdatedDoc = await employeeModel.findByIdAndUpdate(
    //   { _id: req?.userId },
    //   { $addToSet: { bucket: tasks }, $set: { assignedTasks: remainingTasks } },
    //   { new: true }
    // );

    return res.status(200).json({
      success: true,
      message: "Task/Tasks Assigned Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
