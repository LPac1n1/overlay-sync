import usersModel from "../models/usersModel.js";
import overlaysModel from "../models/overlaysModel.js";

const validatePostBody = async (request, response, next) => {
  const { body } = request;

  if (
    body.creator_user_id === undefined ||
    body.channel_name === undefined ||
    body.channel_picture === undefined ||
    body.stream_key === undefined ||
    body.canvas_link === undefined
  ) {
    return response
      .status(400)
      .json({ message: "Faltando campos obrigatórios" });
  }

  if (
    body.creator_user_id === "" ||
    body.channel_name === "" ||
    body.channel_picture === "" ||
    body.stream_key === "" ||
    body.canvas_link === ""
  ) {
    return response
      .status(400)
      .json({ message: "Campos não podem ser vazios" });
  }

  const users = await usersModel.getAllUsers();
  const ids = users.map((user) => user.id.toString());
  let userExists = false;

  for (const id of ids) {
    if (id === body.creator_user_id) {
      userExists = true;
      break;
    }
  }

  if (!userExists)
    return response
      .status(400)
      .json({ message: "ID de usuário criador não encontrado" });

  const overlays = await overlaysModel.getAllOverlays();
  const streamKeys = overlays.map((overlay) => overlay.stream_key.toString());
  const canvasLinks = overlays.map((overlay) => overlay.canvas_link.toString());

  for (const streamKey of streamKeys) {
    if (streamKey === body.stream_key) {
      return response
        .status(400)
        .json({ message: "Chave da stream já existe para outro usuário" });
    }
  }

  for (const canvasLink of canvasLinks) {
    if (canvasLink === body.canvas_link) {
      return response
        .status(400)
        .json({ message: "Canvas já existe para outro usuário" });
    }
  }

  next();
};

const validateChannelNameField = async (request, response, next) => {
  const { body } = request;

  if (body.channel_name === undefined) {
    return response
      .status(400)
      .json({ message: "Campo 'channel_name' faltando" });
  }

  if (body.channel_name === "") {
    return response
      .status(400)
      .json({ message: "Campo 'channel_name' está vazio" });
  }

  next();
};

const validateChannelPictureField = async (request, response, next) => {
  const { body } = request;

  if (body.channel_picture === undefined) {
    return response
      .status(400)
      .json({ message: "Campo 'channel_picture' faltando" });
  }

  if (body.channel_picture === "") {
    return response
      .status(400)
      .json({ message: "Campo 'channel_picture' está vazio" });
  }

  next();
};

export default {
  validatePostBody,
  validateChannelNameField,
  validateChannelPictureField,
};
