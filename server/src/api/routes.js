import express from "express";

import usersController from "./controllers/usersController.js";
import usersMiddleware from "./middlewares/usersMiddleware.js";

const router = express.Router();

router.get("/api/users", usersController.getAllUsers);

router.post(
  "/api/users",
  usersMiddleware.validateBody,
  usersController.createUser
);

router.put(
  "/api/users/:id",
  usersMiddleware.validateBody,
  usersController.updateUser
);

router.delete("/api/users/:id", usersController.deleteUser);

export default router;
