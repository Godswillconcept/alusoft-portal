const express = require("express");
const router = express.Router();
const {
  getAllProgrammes,
  getProgrammeById,
  createProgramme,
  updateProgramme,
  deleteProgramme,
  attachCourses,
  viewCourses,
  detachCourses,
  enrolment,
} = require("../controllers/programmeController");
const {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  programmeEnroll,
  paymentBalance,
  studentLogin,
  resetStudentPassword,
  forgetStudentPassword,
} = require("../controllers/studentController");
const {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  unbindCourses,
  showCourses,
  bindCourses,
  instructorLogin,
  forgetInstructorPassword,
  resetInstructorPassword,
} = require("../controllers/instructorController");
const {
  getAllPayments,
  getPaymentById,
  getPaymentByStudent,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");
const courseValidator = require("../validators/courseValidator");
const programmeValidator = require("../validators/programmevalidator");
const paymentValidator = require("../validators/paymentValidator");
const instructorValidator = require("../validators/instructorValidator");
const studentValidator = require("../validators/studentValidator");
const jwtVerify = require("../middlewares/jwtVerify");

// programme routes
router.get("/programmes", jwtVerify, getAllProgrammes);
router.get("/programmes/:id", jwtVerify, getProgrammeById);
router.post("/programmes", jwtVerify, programmeValidator, createProgramme);
router.put("/programmes/:id/update", jwtVerify, updateProgramme);
router.delete("/programmes/:id/delete", jwtVerify, deleteProgramme);
router.get("/programmes/:id/courses", jwtVerify, viewCourses);
router.post("/programmes/:id/courses", jwtVerify, attachCourses);
router.delete("/programmes/:id/courses", jwtVerify, detachCourses);
router.get("/programmes/:id/enroll", jwtVerify, enrolment);

// course routes
router.get("/courses", jwtVerify, getAllCourses);
router.get("/courses/:id", jwtVerify, getCourseById);
router.post("/courses", jwtVerify, courseValidator, createCourse);
router.put("/courses/:id/update", jwtVerify, updateCourse);
router.delete("/courses/:id/delete", jwtVerify, deleteCourse);

// student routes
router.get("/students", jwtVerify ,getAllStudents);
router.get("/students/:id", jwtVerify, getStudentById);
router.put("/students/:id/update", jwtVerify, updateStudent);
router.delete("/students/:id/delete", jwtVerify, deleteStudent);
router.post("/students/:id/enroll", jwtVerify, programmeEnroll);
router.get("/students/:id/programmes/:programme_id/balance", jwtVerify, paymentBalance);
// don't need jwt authentication
router.post("/students", studentValidator, createStudent);
router.post("/students/login", studentLogin);
router.post("/students/forgot-password", forgetStudentPassword);
router.post("/students/reset-password", resetStudentPassword);

// instructor routes
router.get("/instructors", jwtVerify, getAllInstructors);
router.get("/instructors/:id", jwtVerify, getInstructorById);
router.put("/instructors/:id/update", jwtVerify, updateInstructor);
router.delete("/instructors/:id/delete", jwtVerify, deleteInstructor);
router.get("/instructors/:id/courses", jwtVerify, showCourses);
router.post("/instructors/:id/courses", jwtVerify, bindCourses);
router.delete("/instructors/:id/courses", jwtVerify, unbindCourses); 
// don't need jwt authentication
router.post("/instructors", instructorValidator, createInstructor);
router.post("/instructors/login", instructorLogin);
router.post("/instructors/forgot-password", forgetInstructorPassword);
router.post("/instructors/reset-password", resetInstructorPassword);

// payment routes
router.get("/payments", jwtVerify, getAllPayments);
router.get("/payments/:id", jwtVerify, getPaymentById);
router.get("/payments/:student_id/payments", jwtVerify, getPaymentByStudent);
router.post("/payments", jwtVerify, paymentValidator, createPayment);
router.put("/payments/:id/update", jwtVerify, updatePayment);
router.delete("/payments/:id/delete", jwtVerify, deletePayment);

module.exports = router;
