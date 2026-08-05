import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/db.js";

vi.mock("../config/db.js");

// POST Tests
describe("POST /api/students", () => {
  beforeEach(() => {
    mockReset(prisma);
  });

  it("should create a student and return 201", async () => {
    const newStudent = {
      name: "Sara Khan",
      email: "sara@example.com",
      rollNumber: "BSIT-004",
      department: "IT",
      userId: 1,
    };

    const createdStudent = {
      id: 1,
      ...newStudent,
    };

    prisma.student.create.mockResolvedValue(createdStudent);

    const res = await request(app).post("/api/students").send(newStudent);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdStudent);

    expect(prisma.student.create).toHaveBeenCalledWith({
      data: newStudent,
    });
  });

  it("should return 409 when email already exists (P2002)", async () => {
    const duplicateStudent = {
      name: "Sara Khan",
      email: "sara@example.com",
      rollNumber: "BSIT-004",
      department: "IT",
      userId: 1,
    };

    const prismaError = {
      code: "P2002",
      meta: {
        target: ["email"],
      },
    };

    prisma.student.create.mockRejectedValue(prismaError);

    const res = await request(app).post("/api/students").send(duplicateStudent);

    expect(res.status).toBe(409);

    expect(res.body).toEqual({
      message: "Duplicate value for field: email",
    });

    expect(prisma.student.create).toHaveBeenCalledWith({
      data: duplicateStudent,
    });
  });
});

// GET Tests
describe("GET /api/students", () => {
  beforeEach(() => {
    mockReset(prisma);
  });

  it("should return 200 and an array of students", async () => {
    const mockStudents = [
      {
        id: 1,
        name: "Sara Khan",
        email: "sara@example.com",
        rollNumber: "BSIT-004",
        department: "IT",
        userId: 1,
      },
      {
        id: 2,
        name: "Ali Raza",
        email: "ali@example.com",
        rollNumber: "BSIT-001",
        department: "CS",
        userId: 1,
      },
    ];

    prisma.student.findMany.mockResolvedValue(mockStudents);

    const res = await request(app).get("/api/students");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockStudents);

    expect(prisma.student.findMany).toHaveBeenCalledWith();
  });
});

// PUT Tests
describe("PUT /api/students/:id", () => {
  beforeEach(() => {
    mockReset(prisma);
  });

  it("should return 404 when updating a non-existent student (P2025)", async () => {
    const updatePayload = {
      name: "Ghost Student",
      email: "ghost@example.com",
      rollNumber: "BSIT-999",
      department: "IT",
      userId: 1,
    };

    const prismaError = {
      code: "P2025",
    };

    prisma.student.update.mockRejectedValue(prismaError);

    const res = await request(app)
      .put("/api/students/9999")
      .send(updatePayload);

    expect(res.status).toBe(404);

    expect(res.body).toEqual({
      message: "Student not found",
    });

    expect(prisma.student.update).toHaveBeenCalledWith({
      where: { id: 9999 },
      data: updatePayload,
    });
  });
});
