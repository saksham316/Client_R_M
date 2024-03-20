// ----------------------------------------------Imports--------------------------------------------------------
import { roleModel } from "../../../Models/Authentication/roleModel.js";
// -------------------------------------------------------------------------------------------------------------

// @desc - creating the role
// @route - POST /admin/auth/role
// @access - public
export const createRole = async (req, res) => {
  try {
    const { roleName, permissions } = req?.body?.payload;

    if (!roleName || permissions?.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Role Name and Permissions are required",
      });
    }

    const userId = req?.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Must be logged in for making this request",
      });
    }

    const doc = new roleModel({
      roleName,
      createdBy: userId,
      permissions,
    });

    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Role Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - updating the role
// @route - PATCH /admin/auth/role/:roleId
// @access - public
export const updateRole = async (req, res) => {
  try {
    const { roleName, permissions } = req?.body?.payload;
    const { roleId } = req?.params;

    if (!roleId) {
      return res.status(400).json({
        success: false,
        message: "Role Id is required",
      });
    }

    if (!roleName || !permissions || permissions?.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Role Name and Permissions are required",
      });
    }

    await roleModel.findByIdAndUpdate(
      { _id: roleId },
      {
        $set: { ...req?.body?.payload },
      },
      {
        $new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Role Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - deleting the permission
// @route - DELETE /admin/auth/role/:roleId
// @access - public
export const deleteRole = async (req, res) => {
  try {
    const { roleId } = req?.params;

    if (!roleId) {
      return res.status(400).json({
        success: false,
        message: "Role Id is required",
      });
    }

    const roleDoc = await roleModel.findByIdAndDelete({ _id: roleId });

    if (!roleDoc) {
      return res.status(400).json({
        success: false,
        message: "No Such Document Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - get all the roles
// @route - GET /admin/auth/role
// @access - public
export const getAllRoles = async (req, res) => {
  try {
     
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 5;

    const data = await roleModel
      .find()
      .populate("createdBy")
      .populate("permissions")
      .limit(limit)
      .skip(limit * (page - 1));

    const newData = JSON.parse(JSON.stringify(data));

    console.log(newData);
    const roles = newData.map((item) => {
      delete item.createdBy.password;
      return item;
    });
    return res.status(200).json({
      success: true,
      message: "Roles Found Successfully",
      data: {
        roles,
        page,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - get individual role
// @route - GET /admin/auth/role/:roleId
// @access - public
export const getIndividualRole = async (req, res) => {
  try {
    const { roleId } = req?.params;

    if (!roleId) {
      return res.status(400).json({
        success: false,
        message: "Role Id is required",
      });
    }

    const data = await roleModel
      .findById({ _id: roleId })
      .populate("createdBy")
      .populate("permissions");

    const newData = JSON.parse(JSON.stringify(data));

    delete newData.createdBy.password;

    return res.status(200).json({
      success: true,
      message: "Role Found Successfully",
      data: {
        role: newData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
