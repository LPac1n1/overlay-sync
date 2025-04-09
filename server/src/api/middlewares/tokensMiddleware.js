import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const authToken = (request, response, next) => {
  const token = request.cookies.token;

  if (!token || token === undefined) {
    return response.status(401).json({ message: "token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    request.user = decoded;
    next();
  } catch (error) {
    console.error(`error verifying token: ${error}`);
    return response.status(401).json({ message: `invalid or expired token` });
  }
};

export default {
  authToken,
};
