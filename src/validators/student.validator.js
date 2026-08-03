import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  rollNumber: z.string().min(1, "Roll number is required"),
  department: z.string().min(1, "Department is required"),
  userId: z.number().int().positive("userId must be a positive integer"),
});

export const updateStudentSchema = createStudentSchema;