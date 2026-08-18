import { describe, it, expect, vi, beforeEach } from "vitest";
import { authenticate } from "./authenticate.js";
import { verifyToken } from "../utils/token.js";

vi.mock("../utils/token.js");

beforeEach(() => {
  vi.resetAllMocks();
});

describe("authenticate middleware", () => {

  it("should return 401 when no Authorization header is present", () => {

    const req = { headers: {} };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });

    expect(next).not.toHaveBeenCalled();

  });


  it("should return 401 when token verification fails", () => {

    verifyToken.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const req = {
      headers: {
        authorization: "Bearer badtoken",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid or expired token",
    });

    expect(next).not.toHaveBeenCalled();

  });


  it("should attach user and call next when token is valid", () => {

    verifyToken.mockReturnValue({
      userId: 1,
      role: "ADMIN",
    });

    const req = {
      headers: {
        authorization: "Bearer goodtoken",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    authenticate(req, res, next);

    expect(req.user).toEqual({
      userId: 1,
      role: "ADMIN",
    });

    expect(next).toHaveBeenCalled();

  });

});