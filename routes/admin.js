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

// programme routes
router.get("/programmes", getAllProgrammes);
router.get("/programmes/:id", getProgrammeById);
router.post("/programmes", programmeValidator, createProgramme);
router.put("/programmes/:id/update", updateProgramme);
router.delete("/programmes/:id/delete", deleteProgramme);
router.get("/programmes/:id/courses", viewCourses);
router.post("/programmes/:id/courses", attachCourses);
router.delete("/programmes/:id/courses", detachCourses);
router.get("/programmes/:id/enroll", enrolment);

// course routes
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.post("/courses", courseValidator, createCourse);
router.put("/courses/:id/update", updateCourse);
router.delete("/courses/:id/delete", deleteCourse);

// student routes
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.post("/students", studentValidator, createStudent);
router.put("/students/:id/update", updateStudent);
router.delete("/students/:id/delete", deleteStudent);
router.post("/students/:id/enroll", programmeEnroll);
router.get("/students/:id/programmes/:programme_id/balance", paymentBalance);
router.post("/students/login", studentLogin);
router.post("/students/forgot-password", forgetStudentPassword);
router.post("/students/reset-password", resetStudentPassword);

// instructor routes
router.get("/instructors", getAllInstructors);
router.get("/instructors/:id", getInstructorById);
router.post("/instructors", instructorValidator, createInstructor);
router.put("/instructors/:id/update", updateInstructor);
router.delete("/instructors/:id/delete", deleteInstructor);
router.get("/instructors/:id/courses", showCourses);
router.post("/instructors/:id/courses", bindCourses);
router.delete("/instructors/:id/courses", unbindCourses);
router.post("/instructors/login", instructorLogin);

// payment routes
router.get("/payments", getAllPayments);
router.get("/payments/:id", getPaymentById);
router.get("/payments/:student_id/payments", getPaymentByStudent);
router.post("/payments", paymentValidator, createPayment);
router.put("/payments/:id/update", updatePayment);
router.delete("/payments/:id/delete", deletePayment);

module.exports = router;
