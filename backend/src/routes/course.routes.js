import { Router } from "express";

import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
  dropStudent,
} from "../controllers/course.controller.js";

import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

import {
  createCourseSchema,
  updateCourseSchema,
  enrollStudentSchema,
} from "../validators/course.validator.js";

const router = Router();

// Any authenticated user (ADMIN, TEACHER, STUDENT) can view courses
router.get("/", authenticate, getAllCourses);

// ADMIN + TEACHER manage the course catalog and rosters
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  validate(createCourseSchema),
  createCourse
);

// Only ADMIN can edit an existing course
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateCourseSchema),
  updateCourse
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  deleteCourse
);

router.post(
  "/:id/enroll",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  validate(enrollStudentSchema),
  enrollStudent
);

router.delete(
  "/:id/enroll/:studentId",
  authenticate,
  authorize("ADMIN", "TEACHER"),
  dropStudent
);

export default router;
