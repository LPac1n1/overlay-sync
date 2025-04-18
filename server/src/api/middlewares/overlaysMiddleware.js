import overlaysModel from "../models/overlaysModel.js";
import overlayUsersModel from "../models/overlayUsersModel.js";

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

const validateOverlayCreatorUser = async (request, response, next) => {
  const { user } = request;
  const { id } = request.params;

  const overlay = await overlaysModel.getOverlayById(id);

  if (!overlay) {
    return response.status(404).json({ message: "overlay not found" });
  }

  if (overlay.creator_user_id !== user.id) {
    return response.status(403).json({ message: "access denied" });
  }

  next();
};

const validateOverlayCanvasRoute = async (request, response, next) => {
  const { id } = request.params;

  const overlays = await overlaysModel.getAllOverlays();
  const overlaysRoutes = new Set(
    overlays.map((overlay) => overlay.canvas_route.toString())
  );

  if (!overlaysRoutes.has(id)) {
    return response.status(404).json({ message: "canvas not found" });
  }

  next();
};

const validateOverlayCanvasAccess = async (request, response, next) => {
  const { user } = request;
  const { id } = request.params;

  const overlay = await overlaysModel.getOverlayByCanvasRoute(id);

  const overlayUsers = await overlayUsersModel.getOverlayUsersByOverlayId(
    overlay.id
  );
  const overlayUsersIds = new Set(
    overlayUsers.map((overlayUser) => overlayUser.user_id)
  );

  const isOwner = overlay.creator_user_id === user.id;
  const isInvited = overlayUsersIds.has(user.id);

  if (!isOwner && !isInvited) {
    return response.status(403).json({ message: "canvas access denied" });
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
  validateOverlayCreatorUser,
  validateOverlayCanvasRoute,
  validateOverlayCanvasAccess,
  validateChannelNameField,
  validateChannelPictureField,
};
