import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStudent } from "./student.controller.js";
import { prisma } from "../config/db.js";

vi.mock("../config/db.js");

describe("createStudent controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a student successfully", async () => {
    const mockStudent = {
      id: 1,
      name: "Sara Khan",
      email: "sara@example.com",
      rollNumber: "BSIT-004",
      department: "IT",
      userId: 1,
    };

    prisma.student.create.mockResolvedValue(mockStudent);

    const req = {
      body: {
        name: "Sara Khan",
        email: "sara@example.com",
        rollNumber: "BSIT-004",
        department: "IT",
        userId: 1,
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await createStudent(req, res);

    expect(prisma.student.create).toHaveBeenCalledWith({
      data: req.body,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });
});