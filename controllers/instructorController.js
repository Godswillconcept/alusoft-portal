const Instructor = require("../models/Instructor");
const InstructorCourse = require("../models/InstructorCourse");
const Course = require("../models/Course");

const getAllInstructors = async (req, res) => {
  const instructors = await Instructor.findAll();
  try {
    res.json({
      status: "success",
      message: "Instructors retrieved successfully",
      data: instructors,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Instructors retrieved failed",
      data: error,
    });
  }
};

const getInstructorById = async (req, res) => {
  const { id } = req.params; // instructor id
  const instructor = await Instructor.findById(id); // instructor from instructors collection
  try {
    res.json({
      status: "Success",
      message: "Instructors retrieved successfully",
      data: instructor,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Instructors retrieved failed",
      data: error,
    });
  }
};

const createInstructor = async (req, res) => {
  const {
    title,
    surname,
    first_name,
    other_name,
    gender,
    email,
    address,
    phone,
    dob,
    employment_date,
    photo,
    password,
    status,
  } = req.body;
  let instructor = new Instructor(
    title,
    surname,
    first_name,
    other_name,
    gender,
    email,
    address,
    phone,
    dob,
    employment_date,
    photo,
    password,
    status
  );
  try {
    instructor = await instructor.create();
    res.json({
      status: "Success",
      message: "Instructor created successfully",
      data: instructor,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "An error occurred while creating",
      data: error,
    });
  }
};

const updateInstructor = async (req, res) => {
  const { id } = req.params; // instructor id
  const instructor = await Instructor.findById(id);
  const {
    title,
    surname,
    first_name,
    other_name,
    gender,
    email,
    address,
    phone,
    dob,
    employment_date,
    photo,
    password,
    status,
  } = req.body; // updated values for instructor
  instructor.title = title || instructor.title;
  instructor.surname = surname || instructor.surname;
  instructor.first_name = first_name || instructor.first_name;
  instructor.other_name = other_name || instructor.other_name;
  instructor.gender = gender || instructor.gender;
  instructor.email = email || instructor.email;
  instructor.address = address || instructor.address;
  instructor.phone = phone || instructor.phone;
  instructor.dob = dob || instructor.dob;
  instructor.employment_date = employment_date || instructor.employment_date;
  instructor.photo = photo || instructor.photo;
  instructor.password = password || instructor.password;
  instructor.status = status || instructor.status;

  try {
    await instructor.update();
    res.json({
      status: "Success",
      message: "Instructor updated successfully",
      data: instructor,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "An error occurred while updating",
      data: error,
    });
  }
};

const deleteInstructor = async (req, res) => {
  const { id } = req.params; // instructor id
  const instructor = await Instructor.findById(id);
  try {
    await instructor.delete();
    res.json({
      status: "success",
      message: "Instructor deleted successfully",
      data: instructor,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "An error occurred while deleting",
      data: error,
    });
  }
};

const bindCourses = async (req, res) => {
  const { id } = req.params; // instructor id
  const { courses } = req.body; //array of courses id to attach
  // prevent duplicate entries
  const dbCourses = await InstructorCourse.findCoursesByInstructor(id);
  const formCourses = courses.map(Number);
  let newCourses = [];
  // filter out new courses
  if (dbCourses !== null) {
    newCourses = formCourses.filter((course) => !dbCourses.includes(course));
  } else {
    newCourses = formCourses;
  }
  // console.log(newCourses);
  // return;
  try {
    for (let course_id of newCourses) {
      const attachment = new InstructorCourse(course_id, id); // id refers to the instructor id
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

const unbindCourses = async (req, res) => {
  const { id } = req.params; // instructor id
  const { courses } = req.body; //array of courses id to attach

  // prevent duplicate entries
  const dbCourses = await InstructorCourse.findCoursesByInstructor(id);
  const formCourses = courses.map(Number);
  // filter out  courses to detach
  const detachCourses = dbCourses.filter((course) =>
    formCourses.includes(course)
  );
  try {
    for (let course_id of detachCourses) {
      const detachment = new InstructorCourse(course_id, id); // id refers to the instructor id
      await detachment.delete();
    }
    res.json({
      status: "success",
      message: "Courses detached successfully",
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Failed to detach courses",
      data: error,
    });
  }
};

const showCourses = async (req, res) => {
  const { id } = req.params; // instructor id
  const course_ids = await InstructorCourse.findCoursesByInstructor(id); // array of course ids
  const courses = [];
  try {
    for (let course_id of course_ids) {
      const course = await Course.findById(course_id); // find course by id
      courses.push(course);
    }
    res.json({
      status: "success",
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Failed to retrieve courses",
      data: error,
    });
  }
};

module.exports = {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  bindCourses,
  unbindCourses,
  showCourses,
};
