import invitesModel from "../models/invitesModel.js";
import overlaysModel from "../models/overlaysModel.js";
import overlayUsersModel from "../models/overlayUsersModel.js";

const validateInvitePostBody = async (request, response, next) => {
  const { invite_token, overlay_id } = request.body;

  if (invite_token === undefined || overlay_id === undefined) {
    return response.status(400).json({
      message: "missing required fields",
    });
  }

  if (invite_token === "" || overlay_id === "") {
    return response.status(400).json({
      message: "fields cannot be empty",
    });
  }

  next();
};

const validateInviteToken = async (request, response, next) => {
  const { invite_token } = request.body;

  if (invite_token === undefined) {
    return response.status(400).json({
      message: "missing required fields",
    });
  }

  if (invite_token === "") {
    return response.status(400).json({
      message: "fields cannot be empty",
    });
  }

  const invites = await invitesModel.getAllInvites();
  const invitesTokens = new Set(
    invites.map((invite) => invite.invite_token.toString())
  );

  if (!invitesTokens.has(invite_token)) {
    return response.status(400).json({
      message: "token does not exist",
    });
  }

  next();
};

const validateInviteOverlay = async (request, response, next) => {
  const { invite_token } = request.body;

  const overlays = await overlaysModel.getAllOverlays();
  const overlaysIds = new Set(overlays.map((overlay) => overlay.id));

  const invites = await invitesModel.getAllInvites();
  const invite = invites.find((invite) => invite.invite_token === invite_token);

  if (!overlaysIds.has(invite.overlay_id)) {
    return response.status(400).json({
      message: "overlay does not exist anymore",
    });
  }

  request.overlay = { id: invite.overlay_id };

  next();
};

const validateUnlinkWithOverlay = async (request, response, next) => {
  const { id: overlay_id } = request.overlay;
  const { id: user_id } = request.user;

  const overlay = await overlaysModel.getOverlayById(overlay_id);

  const overlayUsers = await overlayUsersModel.getOverlayUsersByOverlayId(
    overlay_id
  );
  const overlayUsersIds = new Set(
    overlayUsers.map((overlayUser) => overlayUser.user_id)
  );

  if (overlay.creator_user_id === user_id || overlayUsersIds.has(user_id)) {
    return response.status(400).json({
      message: "user already own this overlay",
    });
  }

  next();
};

export default {
  validateInvitePostBody,
  validateInviteToken,
  validateInviteOverlay,
  validateUnlinkWithOverlay,
};
