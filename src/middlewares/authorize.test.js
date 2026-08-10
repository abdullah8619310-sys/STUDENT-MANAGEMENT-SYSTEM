import { describe, it, expect, vi } from "vitest";
import { authorize } from "./authorize.js";


describe("authorize middleware", () => {


  it("should return 401 if user is missing", () => {

    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();


    authorize("ADMIN")(req, res, next);


    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });

    expect(next).not.toHaveBeenCalled();

  });



  it("should return 403 if role is not allowed", () => {


    const req = {
      user: {
        role: "TEACHER",
      },
    };


    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };


    const next = vi.fn();


    authorize("ADMIN")(req, res, next);


    expect(res.status).toHaveBeenCalledWith(403);


    expect(res.json).toHaveBeenCalledWith({
      message: "Forbidden: insufficient permissions",
    });


    expect(next).not.toHaveBeenCalled();

  });



  it("should call next if role is allowed", () => {


    const req = {
      user: {
        role: "ADMIN",
      },
    };


    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };


    const next = vi.fn();


    authorize("ADMIN")(req, res, next);


    expect(next).toHaveBeenCalledTimes(1);


  });


});