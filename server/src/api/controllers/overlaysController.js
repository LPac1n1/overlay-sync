import overlaysModel from "../models/overlaysModel.js";
import overlayUsersModel from "../models/overlayUsersModel.js";

const getAllOverlays = async (_request, response) => {
  const overlays = await overlaysModel.getAllOverlays();
  return response.status(200).json(overlays);
};

const getOverlayByCanvasRoute = async (request, response) => {
  const overlay = await overlaysModel.getOverlayByCanvasRoute(
    request.params.id
  );
  return response.status(200).json(overlay);
};

const getOverlaysByUserId = async (request, response) => {
  const createdOverlays = await overlaysModel.getOverlaysByCreatorUserId(
    request.user.id
  );

  const userInvitedOverlays = await overlayUsersModel.getOverlaysByUserId(
    request.user.id
  );

  const invitedOverlays = await Promise.all(
    userInvitedOverlays.map((overlay) =>
      overlaysModel.getOverlayById(overlay.overlay_id)
    )
  );

  const getedOverlays = { createdOverlays, invitedOverlays };
  return response.status(200).json(getedOverlays);
};

const createOverlay = async (request, response) => {
  const overlay = await overlaysModel.createOverlay(request.body, request.user);
  return response.status(201).json({ overlay });
};

const updateOverlayChannelName = async (request, response) => {
  await overlaysModel.updateOverlayChannelName(request.body, request.params.id);
  return response.status(204).json();
};

const updateOverlayChannelPicture = async (request, response) => {
  await overlaysModel.updateOverlayChannelPicture(
    request.body,
    request.params.id
  );
  return response.status(204).json();
};

const deleteOverlay = async (request, response) => {
  await overlaysModel.deleteOverlay(request.params.id);
  return response.status(204).json();
};

export default {
  getAllOverlays,
  getOverlayByCanvasRoute,
  getOverlaysByUserId,
  createOverlay,
  updateOverlayChannelName,
  updateOverlayChannelPicture,
  deleteOverlay,
};
