import { prisma } from '../config/db.js';

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