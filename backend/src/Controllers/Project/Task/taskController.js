// -------------------------------------------------Imports--------------------------------------------------
import mongoose from "mongoose";
import { employeeModel } from "../../../Models/Authentication/employeeModel.js";
// ----------------------------------------------------------------------------------------------------------

// @method -  GET
// @desc - getting all the coder/noteTaker managers bucket data
// @route - /admin/task/bucket
export const getBucketData = async (req, res, next) => {
  try {
    const userId = req?.userId;

    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "codertasks",
          localField: "bucket",
          foreignField: "_id",
          as: "populatedBucket",
        },
      },
      {
        $project: {
          populatedBucket: 1,
        },
      },
    ];

    const [result] = await employeeModel.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "Bucket Data Found Successfully",
      data: { bucket: result?.populatedBucket },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
