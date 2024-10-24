const Programme = require("../models/Programme");
const Course = require("../models/Course");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const StudentProgramme = require("../models/StudentProgramme");
const Student = require("../models/Student");

const getAllProgrammes = async (req, res) => {
  const programmes = await Programme.findAll();
  try {
    res.json({
      status: "success",
      message: "All programmes retrieved successfully",
      data: programmes,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "All programmes retrieved failed",
      data: error,
    });
  }
};

const getProgrammeById = async (req, res) => {
  const { id } = req.params;
  const programme = await Programme.findById(id);
  try {
    res.json({
      status: "success",
      message: "Programme retrieved successfully",
      data: programme,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Programme retrieved failed",
      data: error,
    });
  }
};

const createProgramme = async (req, res) => {
  const { name, description, session, tuition } = req.body;
  let programme = new Programme(name, description, session, tuition);
  try {
    programme = await programme.create();
    res.json({
      status: "success",
      message: "New programme created successfully",
      data: programme,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: "New programme created failed",
      data: error,
    });
  }
};

const updateProgramme = async (req, res) => {
  const { id } = req.params;
  const { name, description, session, tuition } = req.body;
  let programme = await Programme.findById(id);
  programme.name = name || programme.name;
  programme.description = description || programme.description;
  programme.session = session || programme.session;
  programme.tuition = tuition || programme.tuition;
  try {
    programme = await programme.update();
    res.json({
      status: "success",
      message: "Programme updated successfully",
      data: programme,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Programme updated failed",
      data: error,
    });
  }
};

const deleteProgramme = async (req, res) => {
  const { id } = req.params;
  const programme = await Programme.findById(id);
  try {
    await programme.delete();
    res.json({
      status: "success",
      message: "Programme deleted successfully",
      data: programme,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Programme deleted failed",
      data: error,
    });
  }
};

const attachCourses = async (req, res) => {
  try {
    const { id } = req.params; // programme id
    const { courses } = req.body; // array of course ids [1, 2, 3]

    // Retrieve existing courses for the programme
    const dbCourses = await ProgrammeCourse.findCoursesByProgramme(id);
    const formCourses = courses.map(Number); // Ensure they are numbers

    // Filter out courses that are already attached
    const newCourses = formCourses.filter(
      (course) => !dbCourses.includes(course)
    );

    // Insert only new courses
    for (let course of newCourses) {
      const attachment = new ProgrammeCourse(id, course);
      await attachment.create();
    }

    res.json({
      status: "success",
      message: "Courses attached successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: "Failed to attach courses",
      data: error,
    });
  }
};

const detachCourses = async (req, res) => {
  try {
    const { id } = req.params; // programme id
    const { courses } = req.body; // array of course ids to detach

    // Retrieve existing courses for the programme
    const dbCourses = await ProgrammeCourse.findCoursesByProgramme(id);
    const formCourses = courses.map(Number); // Ensure they are numbers

    // Find courses that need to be detached
    const detachCourses = dbCourses.filter((course) =>
      formCourses.includes(course)
    );

    // Detach the specified courses
    for (let course_id of detachCourses) {
      const programmeCourse = await ProgrammeCourse.findById(course_id);
      if (programmeCourse) {
        await programmeCourse.delete();
      }
    }

    res.json({
      status: "success",
      message: "Courses detached successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: "Failed to detach courses",
      data: error,
    });
  }
};

const viewCourses = async (req, res) => {
  const { id } = req.params; // programme id
  const course_ids = await ProgrammeCourse.findCoursesByProgramme(id);
  const courses = [];
  for (let course_id of course_ids) {
    const course = await Course.findById(course_id);
    courses.push(course);
  }
  res.json({
    status: "success",
    message: "Courses retrieved successfully",
    data: courses,
  });
};

const enrolment = async (req, res) => {
  const { id } = req.params; // programme id
  let students = [];
  const student_ids = await StudentProgramme.findStudentsByProgramme(id); // id refers to programme id

  try {
    for (let student_id of student_ids) {
      const student = await Student.findById(student_id);
      students.push(student);
    }

    if (students.length != 0) {
      res.json({
        status: "success",
        message: "Students retrieved successfully",
        data: students,
      });
    } else {
      res.json({
        status: "success",
        message: "Students retrieved successfully",
        data: "No students found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: "Students retrieved failed",
      data: error,
    });
  }
};

module.exports = {
  getAllProgrammes,
  getProgrammeById,
  createProgramme,
  updateProgramme,
  deleteProgramme,
  attachCourses,
  detachCourses,
  viewCourses,
  enrolment,
};
