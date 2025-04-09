import overlaysModel from "../models/overlaysModel.js";

const validatePostBody = async (request, response, next) => {
  const { body } = request;

  if (
    body.channel_name === undefined ||
    body.channel_picture === undefined ||
    body.stream_key === undefined ||
    body.canvas_route === undefined
  ) {
    return response.status(400).json({ message: "missing required fields" });
  }

  if (
    body.channel_name === "" ||
    body.channel_picture === "" ||
    body.stream_key === "" ||
    body.canvas_route === ""
  ) {
    return response.status(400).json({ message: "fields cannot be empty" });
  }

  const overlays = await overlaysModel.getAllOverlays();
  const streamKeys = new Set(
    overlays.map((overlay) => overlay.stream_key.toString())
  );
  const canvasRoutes = new Set(
    overlays.map((overlay) => overlay.canvas_route.toString())
  );

  if (streamKeys.has(body.stream_key)) {
    return response.status(400).json({ message: "stream key alread exists" });
  }

  if (canvasRoutes.has(body.canvas_route)) {
    return response.status(400).json({ message: "canvas route alread exists" });
  }

  next();
};

const validateChannelNameField = async (request, response, next) => {
  const { body } = request;

  if (body.channel_name === undefined) {
    return response
      .status(400)
      .json({ message: "'channel_name' field is missing" });
  }

  if (body.channel_name === "") {
    return response
      .status(400)
      .json({ message: "'channel_name' field cannot be empty" });
  }

  next();
};

const validateChannelPictureField = async (request, response, next) => {
  const { body } = request;

  if (body.channel_picture === undefined) {
    return response
      .status(400)
      .json({ message: "'channel_picture' field is missing" });
  }

  if (body.channel_picture === "") {
    return response
      .status(400)
      .json({ message: "'channel_picture' field cannot be empty" });
  }

  next();
};

export default {
  validatePostBody,
  validateChannelNameField,
  validateChannelPictureField,
};
