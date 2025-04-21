import usersModel from "../models/usersModel.js";
import createToken from "../utils/createToken.js";
import expireToken from "../utils/expireToken.js";

const getAllUsers = async (_request, response) => {
  const users = await usersModel.getAllUsers();
  return response.status(200).json(users);
};

const getUserById = async (request, response) => {
  const user = await usersModel.getUserById(request.user.id);
  return response.status(200).json(user);
};

const getUserByEmail = async (request, response) => {
  const getedUser = await usersModel.getUserByEmail(request.body);
  return response.status(200).json(getedUser);
};

const loginUser = async (request, response) => {
  const logedUser = await usersModel.getUserByEmail(request.body.email);
  return createToken(response, 200, logedUser);
};

const createUser = async (request, response) => {
  const createdUser = await usersModel.createUser(request.body);
  return createToken(response, 201, createdUser);
};

const logoutUser = async (_request, response) => {
  return expireToken(response, 200);
};

const updateUserName = async (request, response) => {
  await usersModel.updateUserName(request.body, request.params.id);
  return response.status(204).json();
};

const updateUserPassword = async (request, response) => {
  await usersModel.updateUserPassword(request.body, request.params.id);
  return response.status(204).json();
};

const updateUserProfilePicture = async (request, response) => {
  await usersModel.updateUserProfilePicture(request.body, request.params.id);
  return response.status(204).json();
};

const deleteUser = async (request, response) => {
  await usersModel.deleteUser(request.params.id);
  return expireToken(response, 204);
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  loginUser,
  createUser,
  logoutUser,
  updateUserName,
  updateUserPassword,
  updateUserProfilePicture,
  deleteUser,
};
