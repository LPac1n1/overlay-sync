import overlayUsersModel from "../models/overlayUsersModel.js";
import overlaysModel from "../models/overlaysModel.js";
import usersModel from "../models/usersModel.js";

const getOverlayUsersByOverlayId = async (request, response) => {
  const { id } = request.params;

  const overlay = await overlaysModel.getOverlayById(id);
  const overlayCreatorUserId = overlay.creator_user_id;

  const creatorUser = await usersModel.getUserById(overlayCreatorUserId);

  const overlayUsersIds = await overlayUsersModel.getOverlayUsersByOverlayId(
    id
  );

  const invitedUsers = await Promise.all(
    overlayUsersIds.map((overlayUser) =>
      usersModel.getUserById(overlayUser.user_id)
    )
  );

  const allUsers = [creatorUser, ...invitedUsers];

  return response.status(200).json(allUsers);
};

const leaveOverlay = async (request, response) => {
  const { user } = request;
  const { id } = request.params;

  await overlayUsersModel.deleteOverlayUser(user.id, id);
  return response.status(204).json();
};

export default {
  getOverlayUsersByOverlayId,
  leaveOverlay,
};
