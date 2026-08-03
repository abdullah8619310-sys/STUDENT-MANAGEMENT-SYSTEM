import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  createStudentSchema,
  updateStudentSchema,
} from "../validators/student.validator.js";

const router = Router();

router.post("/", validate(createStudentSchema), createStudent);

router.get("/", getAllStudents);

router.get("/:id", getStudentById);

router.put("/:id", validate(updateStudentSchema), updateStudent);

router.delete("/:id", deleteStudent);

export default router;
