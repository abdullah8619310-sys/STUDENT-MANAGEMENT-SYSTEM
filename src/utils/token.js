import "dotenv/config";
import jwt from "jsonwebtoken";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export function generateToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "1h" });
}

export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}


