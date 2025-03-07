import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";

// Block a user
const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const result = await AdminServices.blockUser(userId);

  sendResponse(res, {
    success: true,
    message: 'User Blocked successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Delete a blog post
const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;

  const result = await AdminServices.deleteBlog(blogId);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUsers();

  sendResponse(res, {
    success: true,
    message: "Users retrieved successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.updateUser(id, req.body);

  sendResponse(res, {
      success: true,
      message: 'User updated successfully',
      statusCode: StatusCodes.OK,
      data: { result },
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
  getAllUsers,
  updateUser,
};
