import { prisma } from "../config/db.js";

export const createStudent = async (req, res) => {
  const { name, email, rollNumber, department, userId } = req.body;

  const student = await prisma.student.create({
    data: {
      name,
      email,
      rollNumber,
      department,
      userId,
    },
  });

  res.status(201).json(student);
};

export const getAllStudents = async (req, res) => {
  const students = await prisma.student.findMany();

  res.status(200).json(students);
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;

  const student = await prisma.student.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;

  const { name, email, rollNumber, department, userId } = req.body;

  const student = await prisma.student.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
      rollNumber,
      department,
      userId,
    },
  });

  res.status(200).json(student);
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  await prisma.student.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(204).send();
};
