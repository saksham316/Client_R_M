// ----------------------------------------------Imports--------------------------------------------------------
import { departmentModel } from "../../Models/Department/departmentModel.js";
import { pick } from "lodash-es";
// -------------------------------------------------------------------------------------------------------------

// @desc - creating a new department only can be done by super admin
// @route - POST /admin/department
// @access - public
export const createDepartment = async (req, res) => {
  try {
    if (!req?.body?.payload) {
      return res.status(500).json({
        success: false,
        message: `Payload is required`,
      });
    }

    const payload = pick(req?.body?.payload, ["departmentName"]);

    const doc = new departmentModel(payload);
    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Department Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - fetching all the departments
// @route - GET /admin/department
// @access - public
export const getAllDepartments = async (req, res) => {
  try {
    const doc = await departmentModel.find();

    return res.status(200).json({
      success: true,
      message: "Departments Found Successfully",
      data: {
        departments: doc,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - fetching individual department
// @route - GET /admin/department/:departmentId
// @access - public
export const getIndividualDepartment = async (req, res) => {
  try {
    const { departmentId } = req?.params;

    if (!departmentId) {
      return res.status(500).json({
        success: false,
        message: "Department Id is required",
      });
    }

    const doc = await departmentModel.findOne({ _id: departmentId });

    return res.status(200).json({
      success: true,
      message: "Department Found Successfully",
      data: {
        department: doc,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - deleting the department
// @route - DELETE /admin/department/:departmentId
// @access - public
export const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req?.params;

    if (!departmentId) {
      return res.status(500).json({
        success: false,
        message: "Department Id is required",
      });
    }

    const doc = await departmentModel.findOneAndDelete({ _id: departmentId });

    if (!doc) {
      return res.status(400).json({
        success: false,
        message: "No Such Document Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - updating the department
// @route - PATCH /admin/department/:departmentId
// @access - public
export const updateDepartment = async (req, res) => {
  try {
    if (!req?.body?.payload) {
      return res.status(500).json({
        success: false,
        message: `Payload is required`,
      });
    }

    const { departmentId } = req?.params;

    if (!departmentId) {
      return res.status(500).json({
        success: false,
        message: "Department Id is required",
      });
    }

    const doc = await departmentModel.findByIdAndUpdate(
      { _id: departmentId },
      { $set: payload },
      { new: true }
    );

    if (!doc) {
      return res.status(400).json({
        success: false,
        message: "No Such Document Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
