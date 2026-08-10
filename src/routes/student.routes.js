import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

import {
  createStudentSchema,
  updateStudentSchema,
} from "../validators/student.validator.js";


const router = Router();


// Anyone logged in (ADMIN + TEACHER)
router.get(
  "/",
  authenticate,
  getAllStudents
);


router.get(
  "/:id",
  authenticate,
  getStudentById
);


// ADMIN only
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createStudentSchema),
  createStudent
);


router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateStudentSchema),
  updateStudent
);


router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteStudent
);


export default router;