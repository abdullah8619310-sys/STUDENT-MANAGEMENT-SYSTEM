import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
} from "../controllers/student.controller.js";

const router = Router();

router.post("/", createStudent);

router.get("/", getAllStudents);

router.get("/:id", getStudentById);

export default router;