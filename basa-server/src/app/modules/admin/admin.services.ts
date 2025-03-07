import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model"; // Assuming the User model exists
import AppError from "../../errors/AppError";
import BlogPost from "../blog/blog.model";
import { IUser } from "../user/user.interface";

// Block a user
const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  user.deactive = !user.deactive;
  await user.save();
  return;
};

// update role
const updateUser = async (_id: string, updateData:Partial<IUser>) => {
  console.log(_id);
  const updatedBike = await User.findByIdAndUpdate(_id, updateData, { new: true });
  console.log(updatedBike);
  return updatedBike;
};


// Delete a blog post
const deleteBlog = async (blogId: string) => {
  const blog = await BlogPost.findById(blogId);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  await BlogPost.findByIdAndDelete(blogId);

  return;
};

// Get all users
const getAllUsers = async () => {
  const users = await User.find({}); // Fetch all users

  if (!users || users.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No users found");
  }

  return users;
};

export const AdminServices = {
  blockUser,
  deleteBlog,
  getAllUsers, 
  updateUser,
};

