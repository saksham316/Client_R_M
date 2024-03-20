// ----------------------------------------------Imports--------------------------------------------------------
import { permissionModel } from "../../../Models/Authentication/permissionModel.js";
// -------------------------------------------------------------------------------------------------------------

// @desc - creating the permission
// @route - POST /admin/auth/permission
// @access - public
export const createPermission = async (req, res) => {
  try {
    const { permissionName } = req?.body?.payload;

    if (!permissionName) {
      return res.status(400).json({
        success: false,
        message: "Permission Name is required",
      });
    }

    const userId = req?.userId;

    if(!userId){
      return res.status(400).json({
        success:false,
        message:"Must be logged in for making this request"
      })
    }

    const doc = new permissionModel({
      permissionName,
      createdBy: userId ,
    });
    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Permission Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - updating the permission
// @route - PATCH /admin/auth/permission/:permissionId
// @access - public
export const updatePermission = async (req, res) => {
  try {
    const { permissionName } = req?.body?.payload;
    const { permissionId } = req?.params;

    if (!permissionId) {
      return res.status(400).json({
        success: false,
        message: "Permission Id is required",
      });
    }

    if (!permissionName && permissionName.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Permission Name is required",
      });
    }

    await permissionModel.findByIdAndUpdate(
      { _id: permissionId },
      {
        $set: { permissionName },
      },
      {
        $new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Permission Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - deleting the permission
// @route - DELETE /admin/auth/permission/:permissionId
// @access - public
export const deletePermission = async (req, res) => {
  try {
    const { permissionId } = req?.params;

    if (!permissionId) {
      return res.status(400).json({
        success: false,
        message: "Permission Id is required",
      });
    }

    const permissionDoc = await permissionModel.findByIdAndDelete({
      _id: permissionId,
    });

    if (!permissionDoc) {
      return res.status(400).json({
        success: false,
        message: "No Such Document Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Permission Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

// @desc - get all the permissions
// @route - GET /admin/auth/permission
// @access - public
export const getAllPermissions = async (req, res) => {
  try {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 5;

    const data = await permissionModel
      .find()
      .populate("createdBy")
      .limit(limit)
      .skip(limit * (page - 1));

    const newData = JSON.parse(JSON.stringify(data));

    const permissions = newData.map((item) => {
      delete item?.createdBy.password;
      return item;
    });

    return res.status(200).json({
      success: true,
      message: "Permissions Found Successfully",
      data: {
        permissions,
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

// @desc - get individual permission
// @route - GET /admin/auth/permission/:permissionId
// @access - public
export const getIndividualPermission = async (req, res) => {
  try {
    const { permissionId } = req?.params;

    if (!permissionId) {
      return res.status(400).json({
        success: false,
        message: "Permission Id is required",
      });
    }

    const data = await permissionModel
      .findById({ _id: permissionId })
      .populate("createdBy");

    const newData = JSON.parse(JSON.stringify(data));
    delete newData.createdBy.password;

    return res.status(200).json({
      success: true,
      message: "Permission Found Successfully",
      data: {
        permission: newData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
