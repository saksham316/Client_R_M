// @@desc-importing functions/methods/others
import { asyncHandler } from "../../../utils/asyncHandler.js";
import errorResponse from "../../../utils/errorResponse.js";
import reports from "../../Models/Projects/reports.js";
import { urlProvider } from "../../configs/GoogleConsoleConfigs/generateUrl.js";

// @desc - create new report
// @route -POST api/v1/report
export const newReport = asyncHandler(async (req, res, next) => {
  let report;

  if (req?.file) {
    report = await urlProvider(req?.file?.buffer, `${req?.file?.originalname}`);
  }

  const newReportDoc = await new reports({
    ...req?.body,
    report: report?.publicUrl,
  });
  await newReportDoc.save();
  res.status(201).json({ status: true, message: "Submitted successfully!!" });
});

// @desc - get all reports
// @route -GET api/v1/report
export const getAllReports = asyncHandler(async (req, res, next) => {
  const data = await reports
    .find()
    .populate("project", ["_id", "name"])
    .populate("sentBy", ["_id", "email", "name", "avatar"]);

  res.status(200).json({
    status: true,
    data,
    message:
      data?.length >= 1 ? "Data found successfully!!" : "No data found!!",
  });
});

// @desc - delete reports
// @route -DELETE api/v1/report/:id
export const deleteReport = asyncHandler(async (req, res, next) => {
  const isValidId = await reports.findByIdAndDelete(req?.params?.id);
  if (!isValidId) return next(new errorResponse("No data found!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update reports
// @route -PATCH api/v1/report/:id
export const updateReport = asyncHandler(async (req, res, next) => {});
