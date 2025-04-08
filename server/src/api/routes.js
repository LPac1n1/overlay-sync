import express from "express";

import tokensController from "./controllers/tokensController.js";
import usersController from "./controllers/usersController.js";
import usersMiddleware from "./middlewares/usersMiddleware.js";
import overlaysController from "./controllers/overlaysController.js";
import overlaysMiddleware from "./middlewares/overlaysMiddleware.js";

const router = express.Router();

// USERS ROUTE

// Get users data
router.get("/api/users", usersController.getAllUsers);

// Login user
router.post(
  "/api/users/login",
  usersMiddleware.validateEmailField,
  usersMiddleware.validatePasswordField,
  usersMiddleware.validateUserLogin,
  tokensController.createTokens
);

// Register user
router.post(
  "/api/users/register",
  usersMiddleware.validateNameField,
  usersMiddleware.validateEmailField,
  usersMiddleware.validatePasswordField,
  usersMiddleware.validateUserName,
  usersMiddleware.validateUserEmail,
  usersController.createUser
);

// Update user name
router.put(
  "/api/users/:id/name",
  usersMiddleware.validateNameField,
  usersController.updateUserName
);

// Update user password
router.put(
  "/api/users/:id/password",
  usersMiddleware.validatePasswordField,
  usersController.updateUserPassword
);

// Update user profile picture
router.put(
  "/api/users/:id/profile_picture",
  usersMiddleware.validateProfilePictureField,
  usersController.updateUserProfilePicture
);

// Delete user
router.delete("/api/users/:id", usersController.deleteUser);

// OVERLAYS ROUTE

// Get overlays data
router.get("/api/overlays", overlaysController.getAllOverlays);

// Create overlay
router.post(
  "/api/overlays",
  overlaysMiddleware.validatePostBody,
  overlaysController.createOverlay
);

// Update overlay channel name
router.put(
  "/api/overlays/:id/channel_name",
  overlaysMiddleware.validateChannelNameField,
  overlaysController.updateOverlayChannelName
);

// Update overlay channel picture
router.put(
  "/api/overlays/:id/channel_picture",
  overlaysMiddleware.validateChannelPictureField,
  overlaysController.updateOverlayChannelPicture
);

// Delete overlay
router.delete("/api/overlays/:id", overlaysController.deleteOverlay);

export default router;
