// ----------------------------------------------Imports--------------------------------------------------------
import { employeeModel } from "../../Models/Authentication/employeeModel.js";
import { permissionModel } from "../../Models/Authentication/permissionModel.js";
import { roleModel } from "../../Models/Authentication/roleModel.js";
import bcrypt from "bcrypt";
import { urlProvider } from "../../configs/GoogleConsoleConfigs/generateUrl.js";

// -------------------------------------------------------------------------------------------------------------

// @desc - creating a new employee only can be done by super admin
// @route - POST /admin/employee
// @access - public
export const createEmployee = async (req, res) => {
  try {
    const payload = JSON.parse(req?.body?.payload);

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Payload is required",
      });
    }
    let newPayload = { ...payload };

    if (req?.file) {
      const avatarName = `${Math.ceil(Math.random() * 1000000000)}${
        req?.file?.originalname
      }`;
      let { publicUrl } = await urlProvider(req?.file?.buffer, avatarName);
      newPayload = { ...newPayload, avatar: publicUrl };
    }

    // newPayload -- newPayload is the payload with the default role of user

    // const userValidationResult = registrationValidation(newPayload);

    // if (userValidationResult.error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: userValidationResult.error.details[0].message,
    //   });
    // }

    const doesUserAlreadyExists = await employeeModel.findOne({
      $or: [
        { email: payload?.email },
        { userName: payload?.userName?.toString()?.trim() },
      ],
    });

    if (doesUserAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User with the same email/username already exists",
      });
    }

    const userDoc = new employeeModel(newPayload);

    await userDoc.save();

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - updating the employee only can be done by super admin
// @route - PATCH /admin/employee/:employeeId
// @access - public
export const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req?.params;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee Id is required",
      });
    }

    let payload = JSON.parse(req?.body?.payload);

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Payload is required",
      });
    }

    let newPayload = { ...payload };

    if (req?.file) {
      const avatarName = `${Math.ceil(Math.random() * 1000000000)}${
        req?.file?.originalname
      }`;
      let { publicUrl } = await urlProvider(req?.file?.buffer, avatarName);
      newPayload = { ...newPayload, avatar: publicUrl };
    }

    // const updateUserValidationResult = updateUserValidation(payload);

    // if (updateUserValidationResult.error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: updateUserValidationResult.error.details[0].message,
    //   });
    // }

    if (payload?.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload?.password, salt);
      newPayload = { ...newPayload, password: hashedPassword };
    }

    await employeeModel.findByIdAndUpdate(
      { _id: employeeId },
      { $set: { ...newPayload } },
      { $new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - deleting the employee only can be done by super admin
// @route - DELETE /admin/employee/:employeeId
// @access - public`
export const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req?.params;

    const employeeDoc = await employeeModel.findByIdAndDelete({
      _id: employeeId,
    });

    if (!employeeDoc) {
      return res.status(400).json({
        success: false,
        message: "No Such Document Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - getting all the employees data
// @route - GET /admin/employee
// @access - public
export const getAllEmployees = async (req, res) => {
  try {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 50;

    const employees = await employeeModel
      .find()
      .populate({
        path: "role",
        model: roleModel,
        populate: {
          path: "permissions",
          model: permissionModel,
        },
      })
      .limit(limit)
      .skip(limit * (page - 1));

    return res.status(200).json({
      success: true,
      message: "Employees Found Successfully",
      data: {
        employees,
        page,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - getting specific user data
// @route - GET /admin/employee/:employeeId
// @access - public
export const getIndividualEmployee = async (req, res) => {
  try {
    const { employeeId } = req?.params;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const employee = await employeeModel.findOne({ _id: employeeId }).populate({
      path: "role",
      model: roleModel,
      populate: {
        path: "permissions",
        model: permissionModel,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Employee Found Successfully",
      data: { employee },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

