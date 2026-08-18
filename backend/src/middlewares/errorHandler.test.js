import { describe, it, expect, vi } from "vitest";
import { errorHandler } from "./errorHandler.js";

describe("errorHandler middleware", () => {
  it("should return 409 for a Prisma P2002 duplicate error", () => {
    const err = {
      code: "P2002",
      meta: { target: ["email"] },
    };
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Duplicate value for field: email",
    });
  });

  it("should return 404 for a Prisma P2025 not-found error", () => {
    const err = { code: "P2025" };
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Student not found" });
  });

  it("should return 500 for an unrecognized error", () => {
    const err = new Error("Something unexpected broke");
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});
