import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
  dropStudent,
} from "./course.controller.js";
import { prisma } from "../config/db.js";

vi.mock("../config/db.js");

beforeEach(() => {
  mockReset(prisma);
});

const mockStudent = {
  id: 1,
  name: "Sara Khan",
  email: "sara@example.com",
  rollNumber: "BSIT-004",
  department: "IT",
};

const mockCourseRow = (overrides = {}) => ({
  id: 1,
  name: "Intro to Databases",
  code: "CS-201",
  description: "Relational databases and SQL",
  createdAt: new Date(),
  updatedAt: new Date(),
  enrollments: [],
  ...overrides,
});

function makeRes() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn(),
  };
}

describe("getAllCourses controller", () => {
  it("returns 200 with the course list", async () => {
    prisma.course.findMany.mockResolvedValue([mockCourseRow()]);

    const req = {};
    const res = makeRes();

    await getAllCourses(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ id: 1, code: "CS-201", students: [] }),
    ]);
  });
});

describe("createCourse controller", () => {
  it("creates a course and returns 201", async () => {
    prisma.course.create.mockResolvedValue(mockCourseRow());

    const req = {
      body: { name: "Intro to Databases", code: "CS-201", description: "Relational databases and SQL" },
    };
    const res = makeRes();

    await createCourse(req, res);

    expect(prisma.course.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: req.body })
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("updateCourse controller", () => {
  it("updates a course and returns 200", async () => {
    prisma.course.update.mockResolvedValue(mockCourseRow({ name: "Databases II" }));

    const req = {
      params: { id: "1" },
      body: { name: "Databases II", code: "CS-201", description: "Advanced SQL" },
    };
    const res = makeRes();

    await updateCourse(req, res);

    expect(prisma.course.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 }, data: req.body })
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("deleteCourse controller", () => {
  it("deletes a course and returns 204", async () => {
    prisma.course.delete.mockResolvedValue(mockCourseRow());

    const req = { params: { id: "1" } };
    const res = makeRes();

    await deleteCourse(req, res);

    expect(prisma.course.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(204);
  });
});

describe("enrollStudent controller", () => {
  it("returns 404 when the course does not exist", async () => {
    prisma.course.findUnique.mockResolvedValue(null);
    prisma.student.findUnique.mockResolvedValue(mockStudent);

    const req = { params: { id: "1" }, body: { studentId: 1 } };
    const res = makeRes();

    await enrollStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Course not found" });
  });

  it("returns 404 when the student does not exist", async () => {
    prisma.course.findUnique.mockResolvedValue(mockCourseRow());
    prisma.student.findUnique.mockResolvedValue(null);

    const req = { params: { id: "1" }, body: { studentId: 999 } };
    const res = makeRes();

    await enrollStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Student not found" });
  });

  it("returns 409 when the student is already enrolled", async () => {
    prisma.course.findUnique.mockResolvedValue(mockCourseRow());
    prisma.student.findUnique.mockResolvedValue(mockStudent);
    prisma.enrollment.findUnique.mockResolvedValue({ id: 5, studentId: 1, courseId: 1 });

    const req = { params: { id: "1" }, body: { studentId: 1 } };
    const res = makeRes();

    await enrollStudent(req, res);

    expect(prisma.enrollment.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it("enrolls the student and returns 201 with the updated course", async () => {
    prisma.course.findUnique
      .mockResolvedValueOnce(mockCourseRow())
      .mockResolvedValueOnce(
        mockCourseRow({
          enrollments: [{ id: 5, student: mockStudent }],
        })
      );
    prisma.student.findUnique.mockResolvedValue(mockStudent);
    prisma.enrollment.findUnique.mockResolvedValue(null);
    prisma.enrollment.create.mockResolvedValue({ id: 5, studentId: 1, courseId: 1 });

    const req = { params: { id: "1" }, body: { studentId: 1 } };
    const res = makeRes();

    await enrollStudent(req, res);

    expect(prisma.enrollment.create).toHaveBeenCalledWith({
      data: { studentId: 1, courseId: 1 },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        students: [expect.objectContaining({ id: 1, name: "Sara Khan" })],
      })
    );
  });
});

describe("dropStudent controller", () => {
  it("returns 404 when the student is not enrolled", async () => {
    prisma.enrollment.findUnique.mockResolvedValue(null);

    const req = { params: { id: "1", studentId: "1" } };
    const res = makeRes();

    await dropStudent(req, res);

    expect(prisma.enrollment.delete).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("drops the enrollment and returns 200 with the updated course", async () => {
    prisma.enrollment.findUnique.mockResolvedValue({ id: 5, studentId: 1, courseId: 1 });
    prisma.enrollment.delete.mockResolvedValue({ id: 5 });
    prisma.course.findUnique.mockResolvedValue(mockCourseRow({ enrollments: [] }));

    const req = { params: { id: "1", studentId: "1" } };
    const res = makeRes();

    await dropStudent(req, res);

    expect(prisma.enrollment.delete).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ students: [] })
    );
  });
});
