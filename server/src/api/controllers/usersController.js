import usersModel from "../models/usersModel.js";

const getAllUsers = async (_request, response) => {
  const users = await usersModel.getAllUsers();

  return response.status(200).json(users);
};

const createUser = async (request, response) => {
  const createdUser = await usersModel.createUser(request.body);
  return response.status(201).json(createdUser);
};

const updateUser = async (request, response) => {
  await usersModel.updateUser(request.body, request.params.id);
  return response.status(204).json();
};

const deleteUser = async (request, response) => {
  await usersModel.deleteUser(request.params.id);
  return response.status(204).json();
};

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
