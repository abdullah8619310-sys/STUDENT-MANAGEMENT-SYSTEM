import { prisma } from "../config/db.js";

function toCourseResponse(course) {
  return {
    id: course.id,
    name: course.name,
    code: course.code,
    description: course.description,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    students: course.enrollments.map((enrollment) => ({
      enrollmentId: enrollment.id,
      id: enrollment.student.id,
      name: enrollment.student.name,
      email: enrollment.student.email,
      rollNumber: enrollment.student.rollNumber,
      department: enrollment.student.department,
    })),
  };
}

const COURSE_INCLUDE = {
  enrollments: {
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          rollNumber: true,
          department: true,
        },
      },
    },
  },
};

export const getAllCourses = async (req, res) => {
  const courses = await prisma.course.findMany({
    include: COURSE_INCLUDE,
    orderBy: { createdAt: "asc" },
  });

  res.status(200).json(courses.map(toCourseResponse));
};

export const createCourse = async (req, res) => {
  const { name, code, description } = req.body;

  const course = await prisma.course.create({
    data: { name, code, description },
    include: COURSE_INCLUDE,
  });

  res.status(201).json(toCourseResponse(course));
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, code, description } = req.body;

  const course = await prisma.course.update({
    where: { id: Number(id) },
    data: { name, code, description },
    include: COURSE_INCLUDE,
  });

  res.status(200).json(toCourseResponse(course));
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  await prisma.course.delete({ where: { id: Number(id) } });

  res.status(204).send();
};

export const enrollStudent = async (req, res) => {
  const { id } = req.params;
  const { studentId } = req.body;
  const courseId = Number(id);

  const [course, student] = await Promise.all([
    prisma.course.findUnique({ where: { id: courseId } }),
    prisma.student.findUnique({ where: { id: studentId } }),
  ]);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const existing = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId, courseId } },
  });

  if (existing) {
    return res.status(409).json({
      message: `${student.name} is already enrolled in this course.`,
    });
  }

  await prisma.enrollment.create({ data: { studentId, courseId } });

  const updated = await prisma.course.findUnique({
    where: { id: courseId },
    include: COURSE_INCLUDE,
  });

  res.status(201).json(toCourseResponse(updated));
};

export const dropStudent = async (req, res) => {
  const { id, studentId } = req.params;
  const courseId = Number(id);
  const studentIdNum = Number(studentId);

  const enrollment = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId: studentIdNum, courseId } },
  });

  if (!enrollment) {
    return res.status(404).json({
      message: "This student is not enrolled in this course.",
    });
  }

  await prisma.enrollment.delete({ where: { id: enrollment.id } });

  const updated = await prisma.course.findUnique({
    where: { id: courseId },
    include: COURSE_INCLUDE,
  });

  res.status(200).json(toCourseResponse(updated));
};
