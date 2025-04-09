import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export default function generateToken(payload) {
  return jwt.sign(payload, JWT_KEY, {
    expiresIn: "1h",
  });
}
