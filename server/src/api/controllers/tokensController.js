// Em controllers/authController.js
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const verifyToken = (request, response) => {
  const token = request.cookies.token;

  if (!token) {
    return response.status(206).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return response.status(200).json({ authenticated: true, user: decoded });
  } catch (error) {
    console.error(`error verifying token: ${error}`);
    return response.status(403).json({ authenticated: false });
  }
};

export default {
  verifyToken,
};
