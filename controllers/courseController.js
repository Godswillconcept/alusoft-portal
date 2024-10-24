const Course = require("../models/Course");

// get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.findAll();
  try {
    res.json({
      status: "success",
      message: "All courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "All courses retrieved failed",
      data: error,
    });
  }
};

// get course by id
const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  try {
    res.json({
      status: "success",
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Course retrieved failed",
      data: error,
    });
  }
};

// create new course
const createCourse = async (req, res) => {
  const { name, description, duration } = req.body;
  const course = new Course(name, description, duration);
  try {
    await course.create();
    res.json({
      status: "success",
      message: "New course created successfully",
      data: course,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "New course created failed",
      data: error,
    });
  }
};

// update course

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  const { name, description, duration } = req.body;
  course.name = name || course.name;
  course.description = description || course.description;
  course.duration = duration || course.duration;
  try {
    await course.update();
    res.json({
      status: "success",
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Course updated failed",
      data: error,
    });
  }
};

// delete course
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  try {
    await course.delete();
    res.json({
      status: "success",
      message: "Course deleted successfully",
      data: course,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Course deleted failed",
      data: error,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
