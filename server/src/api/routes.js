import express from "express";

import tokensController from "./controllers/tokensController.js";
import tokensMiddleware from "./middlewares/tokensMiddleware.js";
import usersController from "./controllers/usersController.js";
import usersMiddleware from "./middlewares/usersMiddleware.js";
import overlaysController from "./controllers/overlaysController.js";
import overlaysMiddleware from "./middlewares/overlaysMiddleware.js";
import overlayUsersController from "./controllers/overlayUsersController.js";
import overlayUsersMiddleware from "./middlewares/overlayUsersMiddleware.js";
import invitesController from "./controllers/invitesController.js";
import invitesMiddleware from "./middlewares/invitesMiddleware.js";

const router = express.Router();

// AUTH ROUTE

// Verify token
router.get("/api/auth", tokensController.verifyToken);

// USERS ROUTE

// Get all users
router.get("/api/users", usersController.getAllUsers);

// Get user
router.get(
  "/api/users/user",
  tokensMiddleware.authToken,
  usersController.getUserById
);

// Login user
router.post(
  "/api/users/login",
  usersMiddleware.validateEmailField,
  usersMiddleware.validatePasswordField,
  usersMiddleware.validateUserLogin,
  usersController.loginUser
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

// Logout user
router.post(
  "/api/users/logout",
  tokensMiddleware.authToken,
  usersController.logoutUser
);

// Update user name
router.put(
  "/api/users/:id/name",
  tokensMiddleware.authToken,
  usersMiddleware.validateNameField,
  usersMiddleware.validateUserName,
  usersController.updateUserName
);

// Update user password
router.put(
  "/api/users/:id/password",
  tokensMiddleware.authToken,
  usersMiddleware.validatePasswordField,
  usersController.updateUserPassword
);

// Update user profile picture
router.put(
  "/api/users/:id/profile_picture",
  tokensMiddleware.authToken,
  usersMiddleware.validateProfilePictureField,
  usersController.updateUserProfilePicture
);

// Delete user
router.delete(
  "/api/users/:id",
  tokensMiddleware.authToken,
  usersController.deleteUser
);

// OVERLAYS ROUTE

// Get all overlays
router.get("/api/overlays", overlaysController.getAllOverlays);

// Get user overlays
router.get(
  "/api/overlays/user",
  tokensMiddleware.authToken,
  overlaysController.getOverlaysByUserId
);

// Get overlay by canvas route
router.get(
  "/api/overlays/canvas/:id",
  tokensMiddleware.authToken,
  overlaysMiddleware.validateOverlayCanvasRoute,
  overlaysMiddleware.validateOverlayCanvasAccess,
  overlaysController.getOverlayByCanvasRoute
);

// Create overlay
router.post(
  "/api/overlays",
  tokensMiddleware.authToken,
  overlaysMiddleware.validatePostBody,
  overlaysController.createOverlay
);

// Update overlay channel name
router.put(
  "/api/overlays/:id/channel_name",
  tokensMiddleware.authToken,
  overlaysMiddleware.validateChannelNameField,
  overlaysController.updateOverlayChannelName
);

// Update overlay channel picture
router.put(
  "/api/overlays/:id/channel_picture",
  tokensMiddleware.authToken,
  overlaysMiddleware.validateChannelPictureField,
  overlaysController.updateOverlayChannelPicture
);

// Delete overlay
router.delete(
  "/api/overlays/:id",
  tokensMiddleware.authToken,
  overlaysMiddleware.validateOverlayCreatorUser,
  overlaysController.deleteOverlay
);

// OVERLAY USERS ROUTES

// Get overlay users
router.get(
  "/api/overlays/:id/users",
  tokensMiddleware.authToken,
  overlayUsersController.getOverlayUsersByOverlayId
);

router.delete(
  "/api/overlays/:id/leave",
  tokensMiddleware.authToken,
  overlayUsersMiddleware.validateOverlayBond,
  overlayUsersController.leaveOverlay
);

// INVITES ROUTES

// Get all invites
router.get("/api/invites", invitesController.getAllInvites);

// Get all overlay users
router.get("/api/invites/overlay/", invitesController.getAllOverlaysUsers);

// Create invite
router.post(
  "/api/invites",
  tokensMiddleware.authToken,
  invitesMiddleware.validateInvitePostBody,
  invitesController.createInvite
);

// Use invite
router.post(
  "/api/invites/use",
  tokensMiddleware.authToken,
  invitesMiddleware.validateInviteToken,
  invitesMiddleware.validateInviteOverlay,
  invitesMiddleware.validateUnlinkWithOverlay,
  invitesController.useInvite
);

export default router;
