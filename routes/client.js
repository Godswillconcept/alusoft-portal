const express = require("express");
const router = express.Router();
const {
  getAllProgrammes,
  getProgrammeById,
  viewCourses,
  enrolment,
} = require("../controllers/programmeController");
const {
  getAllCourses,
  getCourseById,
} = require("../controllers/courseController");
const {
  getStudentById,
  createStudent,
  updateStudent,
  programmeEnroll,
  paymentBalance,
  studentLogin,
  resetStudentPassword,
} = require("../controllers/studentController");
const {
  getAllInstructors,
  showCourses,
  instructorLogin,
  forgetInstructorPassword,
  resetInstructorPassword,
} = require("../controllers/instructorController");
const { getPaymentByStudent, createPayment } = require("../controllers/paymentController");
const paymentValidator = require("../validators/paymentValidator");
const studentValidator = require("../validators/studentValidator");
const jwtVerify = require("../middlewares/jwtVerify");
const { verify } = require("../middlewares/emailConfig");

// programme routes
router.get("/programmes", getAllProgrammes);
router.get("/programmes/:id", getProgrammeById);
router.get("/programmes/:id/courses", viewCourses);
router.get("/programmes/:id/enroll", jwtVerify, enrolment);

// course routes
router.get("/courses", getAllCourses);
router.get("/courses/:id", jwtVerify, getCourseById);

// student routes
router.get("/students/:id", jwtVerify, getStudentById);
router.put("/students/:id/update", jwtVerify, updateStudent);
router.post("/students/:id/enroll", jwtVerify, programmeEnroll);
router.get("/students/:id/programmes/:programme_id/balance", jwtVerify, paymentBalance);
// don't need jwt authentication
router.post("/students", studentValidator, createStudent);
router.post("/students/login", studentLogin);
router.post("/students/reset-password", resetStudentPassword);

// instructor routes
router.get("/instructors", getAllInstructors);
router.get("/instructors/:id/courses", showCourses);
router.post("/instructors/login", instructorLogin);
router.post("/instructors/forgot-password", forgetInstructorPassword);
router.post("/instructors/reset-password", resetInstructorPassword);

// payment routes
router.get("/payments/:student_id/payments", getPaymentByStudent);
router.post("/payments", paymentValidator, createPayment);

module.exports = router;
