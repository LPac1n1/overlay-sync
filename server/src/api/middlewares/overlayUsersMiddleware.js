import overlayUsersModel from "../models/overlayUsersModel.js";

const validateOverlayBond = async (request, response, next) => {
  const { user } = request;
  const { id } = request.params;

  const userOverlays = await overlayUsersModel.getOverlaysByUserId(user.id);
  const overlaysIds = userOverlays.map((overlay) =>
    overlay.overlay_id.toString()
  );

  if (!overlaysIds.includes(id)) {
    return response.status(401).json({
      message: "user is not part of this overlay",
    });
  }

  next();
};

export default {
  validateOverlayBond,
};
