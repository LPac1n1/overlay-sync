import usersModel from "../models/usersModel.js";

const validateNameField = async (request, response, next) => {
  const { body } = request;

  if (body.name === undefined) {
    return response.status(400).json({ message: "'name' field is missing" });
  }

  if (body.name === "") {
    return response.status(400).json({ message: "'name' field is missing" });
  }

  next();
};

const validateEmailField = async (request, response, next) => {
  const { body } = request;

  if (body.email === undefined) {
    return response.status(400).json({ message: "'email' field is missing" });
  }

  if (body.email === "") {
    return response.status(400).json({ message: "'email' field is missing" });
  }

  next();
};

const validatePasswordField = async (request, response, next) => {
  const { body } = request;

  if (body.password === undefined) {
    return response
      .status(400)
      .json({ message: "'password' field is missing" });
  }

  if (body.password === "") {
    return response
      .status(400)
      .json({ message: "'password' field is missing" });
  }

  next();
};

const validateProfilePictureField = async (request, response, next) => {
  const { body } = request;

  if (body.profile_picture === undefined) {
    return response
      .status(400)
      .json({ message: "'profile_picture' field is missing" });
  }

  if (body.profile_picture === "") {
    return response
      .status(400)
      .json({ message: "'profile_picture' field is missing" });
  }

  next();
};

const validateUserLogin = async (request, response, next) => {
  const { email, password } = request.body;

  const user = await usersModel.getUserByEmail(email);

  if (!user || user.password !== password) {
    return response.status(400).json({ message: "invalid email or password" });
  }

  next();
};

const validateUserName = async (request, response, next) => {
  const { body } = request;

  const users = await usersModel.getAllUsers();
  const nameSet = new Set(users.map((user) => user.name));

  if (nameSet.has(body.name))
    return response.status(400).json({ message: "name alread exists" });

  next();
};

const validateUserEmail = async (request, response, next) => {
  const { body } = request;

  const users = await usersModel.getAllUsers();
  const emailSet = new Set(users.map((user) => user.email));

  if (emailSet.has(body.email))
    return response.status(400).json({ message: "email alread exists" });

  next();
};

export default {
  validateNameField,
  validateEmailField,
  validatePasswordField,
  validateProfilePictureField,
  validateUserLogin,
  validateUserName,
  validateUserEmail,
};
