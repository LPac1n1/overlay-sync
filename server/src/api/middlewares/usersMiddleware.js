import usersModel from "../models/usersModel.js";

const validatePostBody = async (request, response, next) => {
  const { body } = request;

  if (
    body.name === undefined ||
    body.email === undefined ||
    body.password === undefined
  ) {
    return response
      .status(400)
      .json({ message: "Faltando campos obrigatórios" });
  }

  if (body.name === "" || body.email === "" || body.password === "") {
    return response
      .status(400)
      .json({ message: "Campos não podem ser vazios" });
  }

  const users = await usersModel.getAllUsers();
  const emails = users.map((user) => user.email.toString());

  for (const email of emails) {
    if (body.email === email) {
      return response
        .status(400)
        .json({ message: "Email do usuário já existe" });
    }
  }

  next();
};

const validateNameField = async (request, response, next) => {
  const { body } = request;

  if (body.name === undefined) {
    return response.status(400).json({ message: "Campo 'name' faltando" });
  }

  if (body.name === "") {
    return response.status(400).json({ message: "Campo 'name' está vazio" });
  }

  next();
};

const validatePasswordField = async (request, response, next) => {
  const { body } = request;

  if (body.password === undefined) {
    return response.status(400).json({ message: "Campo 'password' faltando" });
  }

  if (body.password === "") {
    return response
      .status(400)
      .json({ message: "Campo 'password' está vazio" });
  }

  next();
};

const validateProfilePictureField = async (request, response, next) => {
  const { body } = request;

  if (body.profile_picture === undefined) {
    return response
      .status(400)
      .json({ message: "Campo 'profile_picture' faltando" });
  }

  if (body.profile_picture === "") {
    return response
      .status(400)
      .json({ message: "Campo 'profile_picture' está vazio" });
  }

  next();
};

export default {
  validatePostBody,
  validateNameField,
  validatePasswordField,
  validateProfilePictureField,
};
