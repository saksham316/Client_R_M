// @@desc-importing functions/methods/others
import { asyncHandler } from "../../../utils/asyncHandler.js";
import errorResponse from "../../../utils/errorResponse.js";
import technology from "../../Models/Others/technology.js";

// @desc - create new technology
// @route -POST api/v1/technology
export const newTechnology = asyncHandler(async (req, res, next) => {
  const newTechnologyDoc = new technology(req?.body);
  await newTechnologyDoc.save();
  res.status(201).json({ status: true, message: "Created successfully!!" });
});

// @desc - get all technologies
// @route -POST api/v1/technology
export const getAllTechnologies = asyncHandler(async (req, res, next) => {
  const data = await technology.find();
  res.status(200).json({
    status: true,
    data,
    message:
      data?.length >= 1 ? "Data found successfully!!" : "NO data found!!",
  });
});

// @desc - delete technology
// @route -Delete api/v1/technology/:id
export const deleteTechnology = asyncHandler(async (req, res, next) => {
  const isValidId = await technology.findByIdAndDelete(req?.params?.id);
  if (!isValidId) next(new errorResponse("No data found", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update technology
// @route -PATCH api/v1/technology
export const updateTechnology = asyncHandler(async (req, res, next) => {
  const isValidId = technology.findByIdAndUpdate(req?.params?.id);
  if (!isValidId) next(new errorResponse("No data found", 400));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
