import { describe, it, expect, beforeEach } from "vitest";
import { generateToken, verifyToken } from "./token.js";

describe("token utility", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-jwt-secret";
  });

  it("should generate a JWT token", () => {
    const token = generateToken({ userId: 1, role: "ADMIN" });

    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });

  it("should verify a valid token and return its payload", () => {
    const payload = { userId: 1, role: "ADMIN" };
    const token = generateToken(payload);

    const decoded = verifyToken(token);

    expect(decoded.userId).toBe(1);
    expect(decoded.role).toBe("ADMIN");
  });

  it("should reject an invalid token", () => {
    expect(() => verifyToken("invalid.token.here")).toThrow();
  });
});


