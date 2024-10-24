const Student = require("../models/Student");
const StudentProgramme = require("../models/StudentProgramme");

const getAllStudents = async (req, res) => {
  const students = await Student.findAll();
  try {
    res.json({
      status: "success",
      message: "All students retrieved successfully",
      data: students,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "All students retrieved failed",
      data: error,
    });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  try {
    res.json({
      status: "success",
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Student retrieved failed",
      data: error,
    });
  }
};

const createStudent = async (req, res) => {
  const {
    surname,
    first_name,
    other_name,
    email,
    phone,
    address,
    dob,
    gender,
    guardian_name,
    guardian_phone,
    guardian_email,
    guardian_address,
    password,
    photo,
    status,
  } = req.body;
  let student = new Student(
    surname,
    first_name,
    other_name,
    email,
    phone,
    address,
    dob,
    gender,
    guardian_name,
    guardian_phone,
    guardian_email,
    guardian_address,
    password,
    photo,
    status
  );
  try {
    student = await student.create();
    res.json({
      status: "success",
      message: "New student created successfully",
      data: student,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "New student created failed",
      data: error,
    });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    surname,
    first_name,
    other_name,
    email,
    phone,
    address,
    dob,
    gender,
    guardian_name,
    guardian_phone,
    guardian_email,
    guardian_address,
    password,
    photo,
    status,
  } = req.body;
  let student = await Student.findById(id);
  student.surname = surname || student.surname;
  student.first_name = first_name || student.first_name;
  student.other_name = other_name || student.other_name;
  student.email = email || student.email;
  student.phone = phone || student.phone;
  student.address = address || student.address;
  student.dob = dob || student.dob;
  student.gender = gender || student.gender;
  student.guardian_name = guardian_name || student.guardian_name;
  student.guardian_phone = guardian_phone || student.guardian_phone;
  student.guardian_email = guardian_email || student.guardian_email;
  student.guardian_address = guardian_address || student.guardian_address;
  student.password = password || student.password;
  student.photo = photo || student.photo;
  student.status = status || student.status;
  try {
    student = await student.update();
    res.json({
      status: "success",
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Student updated failed",
      data: error,
    });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  try {
    await student.delete();
    res.json({
      status: "success",
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Student deleted failed",
      data: error,
    });
  }
};

const programmeEnroll = async (req, res) => {
  const { id } = req.params; // student id
  const { programme_id } = req.body; // programme id

  const enrolled = new StudentProgramme(id, programme_id); // where id refers to student id
  try {
    await enrolled.create();
    res.json({
      status: "success",
      message: "Student enrolled successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: "Student enrolled failed",
      data: error,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  programmeEnroll,
};
