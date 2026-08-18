import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  code: z.string().min(1, "Course code is required"),
  description: z.string().optional(),
});

export const updateCourseSchema = createCourseSchema;

export const enrollStudentSchema = z.object({
  studentId: z.number().int().positive("studentId must be a positive integer"),
});
