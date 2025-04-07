import express from "express";

import usersController from "./controllers/usersController.js";
import usersMiddleware from "./middlewares/usersMiddleware.js";
import overlaysController from "./controllers/overlaysController.js";
import overlaysMiddleware from "./middlewares/overlaysMiddleware.js";

const router = express.Router();

// /api/users
router.get("/api/users", usersController.getAllUsers);
router.post(
  "/api/users",
  usersMiddleware.validatePostBody,
  usersController.createUser
);
router.put(
  "/api/users/:id/name",
  usersMiddleware.validateNameField,
  usersController.updateUserName
);
router.put(
  "/api/users/:id/password",
  usersMiddleware.validatePasswordField,
  usersController.updateUserPassword
);
router.put(
  "/api/users/:id/profile_picture",
  usersMiddleware.validateProfilePictureField,
  usersController.updateUserProfilePicture
);
router.delete("/api/users/:id", usersController.deleteUser);

// /api/overlays
router.get("/api/overlays", overlaysController.getAllOverlays);
router.post(
  "/api/overlays",
  overlaysMiddleware.validatePostBody,
  overlaysController.createOverlay
);
router.put(
  "/api/overlays/:id/channel_name",
  overlaysMiddleware.validateChannelNameField,
  overlaysController.updateOverlayChannelName
);
router.put(
  "/api/overlays/:id/channel_picture",
  overlaysMiddleware.validateChannelPictureField,
  overlaysController.updateOverlayChannelPicture
);
router.delete("/api/overlays/:id", overlaysController.deleteOverlay);

export default router;
