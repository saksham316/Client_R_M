// @@desc-importing functions/methods/others
import { asyncHandler } from "../../../utils/asyncHandler.js";
import errorResponse from "../../../utils/errorResponse.js";
import reports from "../../Models/Projects/reports.js";
import tasks from "../../Models/Projects/tasks.js";
import projects from "../../Models/Projects/projects.js";
import { urlProvider } from "../../configs/GoogleConsoleConfigs/generateUrl.js";

// @desc - create new project
// @route -POST api/v1/projects
export const newProject = asyncHandler(async (req, res, next) => {
  let documents;
  const { assignedTo } = req?.body;

  if (req?.file) {
    documents = await urlProvider(
      req?.file?.buffer,
      `${req?.file?.originalname}`
    );
  }
  if (!assignedTo) {
    return next(new errorResponse("Assigned to is required!!", 400));
  }

  const newProjectDoc = new projects({
    ...req?.body,
    assignedTo: JSON.parse(assignedTo),
    documents: documents?.publicUrl,
  });

  await newProjectDoc.save();
  res.status(201).json({
    status: true,
    message: "Project created successfully!!",
    newProjectDoc,
  });
});

// @desc - get all projects
// @route -GET api/v1/projects
export const getAllProjects = asyncHandler(async (req, res, next) => {
  const data = await projects
    .find()
    .populate("technology", ["technology", "_id"])
    .populate("assignedTo", ["_id", "name", "email", "avatar"]);

  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully" : "No data found",
    data,
  });
});

// @desc - delete project
// @route- DELETE api/v1/project/:id
export const deleteProject = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  const isValidId = await projects.findByIdAndDelete(id);
  if (!isValidId) return next(new errorResponse("No data found", 400));
  await tasks.deleteMany({ project: id });
  await reports.deleteMany({ project: id });
  res
    .status(200)
    .json({ status: true, message: "project deleted successfully!!" });
});

//@desc - update project
//@route - PATCH api/v1/project/:id
export const updateProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let { removedMember, newMember, deadline, name, technology, requirements } =
    req.body;

  //@desc- Parse JSON strings to arrays
  newMember = newMember ? JSON.parse(newMember) : [];
  removedMember = removedMember ? JSON.parse(removedMember) : [];

  //@desc- Define the update object for $push operation
  const pushUpdate =
    newMember.length > 0 ? { $push: { assignedTo: { $each: newMember } } } : {};

  //@desc- Define the update object for $pull operation
  const pullUpdate =
    removedMember.length > 0
      ? { $pull: { assignedTo: { $in: removedMember } } }
      : {};

  const updateFields = {
    ...pushUpdate,
    ...pullUpdate,
    deadline,
    name,
    technology,
    requirements,
  };

  const updatedProject = await projects.findByIdAndUpdate(id, updateFields, {
    new: true,
  });

  if (!updatedProject) {
    return res
      .status(400)
      .json({ status: false, message: "No data found with given id!!" });
  }

  res.status(200).json({
    status: true,
    message: "Updated successfully!!",
  });
});

// @desc - get particlar projects
// @route -GET api/v1/projects/:id
export const getParticularProjects = asyncHandler(async (req, res, next) => {
  const data = await projects
    .find({
      assignedTo: { $in: req?.params?.id },
    })
    .populate("technology", ["technology", "_id"])
    .populate("assignedTo", ["_id", "name", "email", "avatar"]);
  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully" : "No data found",
    data,
  });
});
