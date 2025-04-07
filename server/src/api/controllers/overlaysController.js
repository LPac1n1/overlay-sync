import overlaysModel from "../models/overlaysModel.js";

const getAllOverlays = async (_request, response) => {
  const overlays = await overlaysModel.getAllOverlays();
  return response.status(200).json(overlays);
};

const createOverlay = async (request, response) => {
  const overlay = await overlaysModel.createOverlay(request.body);
  return response.status(201).json(overlay);
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
  createOverlay,
  updateOverlayChannelName,
  updateOverlayChannelPicture,
  deleteOverlay,
};
