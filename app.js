const express = require("express");
const app = express();
const { join } = require("path");
const {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("./controllers/courseController");
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
} = require("./controllers/programmeController");
const {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  unbindCourses,
  showCourses,
  bindCourses,
} = require("./controllers/instructorController");
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, programmeEnroll } = require("./controllers/studentController");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // encoding url
app.use(express.json());

// set view engines
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  //   res.send(`<h1>Alusoft Training Portal</h1>`);
  // res.render("index");
  res.json({
    status: "success",
    message: "Welcome to Alusoft Training Portal",
  });
});

app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "Alusoft Training Portal API endpoint",
  });
});

// routes for courses
app.get("/courses", getAllCourses);
app.get("/courses/:id", getCourseById);
app.post("/courses", createCourse);
app.put("/courses/:id/update", updateCourse);
app.delete("/courses/:id/delete", deleteCourse);

// routes for programmes
app.get("/programmes", getAllProgrammes);
app.get("/programmes/:id", getProgrammeById);
app.post("/programmes", createProgramme);
app.put("/programmes/:id/update", updateProgramme);
app.delete("/programmes/:id/delete", deleteProgramme);
app.get("/programmes/:id/courses", viewCourses);
app.post("/programmes/:id/courses", attachCourses);
app.delete("/programmes/:id/courses", detachCourses);
app.get("/programmes/:id/enroll",  enrolment);

// routes for instructors
app.get("/instructors", getAllInstructors);
app.get("/instructors/:id", getInstructorById);
app.post("/instructors", createInstructor);
app.put("/instructors/:id/update", updateInstructor);
app.delete("/instructors/:id/delete", deleteInstructor);
app.get("/instructors/:id/courses", showCourses);
app.post("/instructors/:id/courses", bindCourses);
app.delete("/instructors/:id/courses", unbindCourses);

// routes for students
app.get("/students", getAllStudents);
app.get("/students/:id", getStudentById);
app.post("/students", createStudent);
app.put("/students/:id/update", updateStudent);
app.delete("/students/:id/delete", deleteStudent);
app.post("/students/:id/enroll", programmeEnroll);

app.listen(PORT, () =>
  console.log(
    `Server listening at port:${PORT} \nvisit http://localhost:${PORT}`
  )
);
