import usersModel from "../models/usersModel.js";

const getAllUsers = async (_request, response) => {
  const users = await usersModel.getAllUsers();
  return response.status(200).json(users);
};

const getUserByEmail = async (request, response) => {
  const getedUser = await usersModel.getUserByEmail(request.body);
  return response.status(201).json(getedUser);
};

const createUser = async (request, response) => {
  const createdUser = await usersModel.createUser(request.body);
  return response.status(201).json(createdUser);
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
  return response.status(204).json();
};

export default {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUserName,
  updateUserPassword,
  updateUserProfilePicture,
  deleteUser,
};
