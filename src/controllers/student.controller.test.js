import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";
import {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
} from "./student.controller.js";
import { prisma } from "../config/db.js";

vi.mock("../config/db.js");

beforeEach(() => {
  mockReset(prisma);
});

describe("createStudent controller", () => {
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


describe("getStudentById controller", () => {
  it("should return 404 when student is not found", async () => {
    prisma.student.findUnique.mockResolvedValue(null);

    const req = {
      params: {
        id: "999",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await getStudentById(req, res);

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: {
        id: 999,
      },
    });

    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      message: "Student not found",
    });
  });


  it("should return 200 and student when found", async () => {
    const mockStudent = {
      id: 1,
      name: "Sara Khan",
      email: "sara@example.com",
      rollNumber: "BSIT-004",
      department: "IT",
      userId: 1,
    };

    prisma.student.findUnique.mockResolvedValue(mockStudent);

    const req = {
      params: {
        id: "1",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await getStudentById(req, res);

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });
});


describe("getAllStudents controller", () => {
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

    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await getAllStudents(req, res);

    expect(prisma.student.findMany).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudents);
  });


  it("should return 200 and empty array when no students exist", async () => {
    prisma.student.findMany.mockResolvedValue([]);

    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await getAllStudents(req, res);

    expect(prisma.student.findMany).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe("updateStudent controller", () => {
  it("should update a student and return 200", async () => {
    const updatedStudent = {
      id: 1,
      name: "Sara Khan Updated",
      email: "sara@example.com",
      rollNumber: "BSIT-004",
      department: "Computer Science",
      userId: 1,
    };

    prisma.student.update.mockResolvedValue(updatedStudent);

    const req = {
      params: {
        id: "1",
      },
      body: {
        name: "Sara Khan Updated",
        email: "sara@example.com",
        rollNumber: "BSIT-004",
        department: "Computer Science",
        userId: 1,
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await updateStudent(req, res);

    expect(prisma.student.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: req.body,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedStudent);
  });
});