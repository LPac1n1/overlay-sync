import overlayUsersModel from "../models/overlayUsersModel.js";

const leaveOverlay = async (request, response) => {
  const { user } = request;
  const { id } = request.params;

  await overlayUsersModel.deleteOverlayUser(user.id, id);
  return response.status(204).json();
};

export default {
  leaveOverlay,
};
