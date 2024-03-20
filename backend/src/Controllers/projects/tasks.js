// @@desc-importing functions/methods/others
import mongoose from "mongoose";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import errorResponse from "../../../utils/errorResponse.js";
import tasks from "../../Models/Projects/tasks.js";
import { taskCreatedMail } from "../../../utils/MailTemplates/taskCreatedMail.js";

// @desc - create new task
// @route -POST api/v1/tasks
export const newTask = asyncHandler(async (req, res, next) => {
  const newTaskDoc = new tasks({
    ...req?.body,
    createdBy: req?.userId,
  });
  await newTaskDoc.save();
  taskCreatedMail(req?.email || "saurabh@pearlorganisation.com").then(() => {
    res.status(201).json({ status: true, message: "Created successfully!!" });
  });
});

// @desc - get all tasks
// @route -GET api/v1/tasks
export const getAllTasks = asyncHandler(async (req, res, next) => {
  const data = await tasks
    .find()
    .populate("createdBy", ["email", "_id", "fullName"])
    .populate("project", ["_id", "name", "projectId"]);

  res.status(200).json({
    status: true,
    data,
    message:
      data?.length >= 1 ? "Data found successfully!!" : "No data found!!",
  });
});

// @desc - get all tasks(on the basis of project)
// @route -GET api/v1/tasks/:id
export const getParticularTasks = asyncHandler(async (req, res, next) => {
  const data = await tasks
    .find({ project: req?.params?.id })
    .populate("createdBy", ["email", "_id", "fullName"])
    .populate("project", ["_id", "name", "projectId"]);
  res.status(200).json({
    status: 200,
    data,
    message:
      data?.length >= 1 ? "Data found successfully!!" : "No data found!!",
  });
});

// @desc - delete task
// @route -DELETE api/v1/tasks/:id
export const deleteTask = asyncHandler(async (req, res, next) => {
  const doc = await tasks.findByIdAndDelete(req?.params?.id);
  if (!doc) next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update task
// @route -PATCH api/v1/tasks/:id
export const updateTask = asyncHandler(async (req, res, next) => {
  const isValidId = await tasks.findByIdAndUpdate(id, req?.body);
  if (!isValidId) return next(new errorResponse("No data found!!", 400));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
