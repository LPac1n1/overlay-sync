import invitesModel from "../models/invitesModel.js";
import overlayUsersModel from "../models/overlayUsersModel.js";

const getAllOverlaysUsers = async (_request, response) => {
  const overlaysUsers = await overlayUsersModel.getAllOverlaysUsers();
  return response.status(200).json(overlaysUsers);
};

const getAllInvites = async (_request, response) => {
  const invites = await invitesModel.getAllInvites();
  return response.status(200).json(invites);
};

const createInvite = async (request, response) => {
  const invite = await invitesModel.createInvite(
    request.body.invite_token,
    request.body.overlay_id
  );
  return response.status(200).json(invite);
};

const useInvite = async (request, response) => {
  await invitesModel.useInvite(request.body.invite_token);
  await overlayUsersModel.addOverlayUser(request.user.id, request.overlay.id);

  return response.status(200).json({ message: "success" });
};

export default {
  getAllOverlaysUsers,
  getAllInvites,
  createInvite,
  useInvite,
};
