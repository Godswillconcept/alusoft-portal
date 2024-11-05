const Student = require("../models/Student");
const StudentProgramme = require("../models/StudentProgramme");
const conn = require("../models/connection");
const bcrypt = require("bcrypt");
const { unlinkSync } = require("fs");

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
    status,
  } = req.body;
  const { photo } = req.files;
  if (photo) {
    var fileName =
      Number(new Date()).toString(32) + Math.random().toString(32).substring(2); // dynamic file name
    let ext = photo.name.split(".").pop();
    fileName = fileName + "." + ext;
    let uploadPath = "uploads/students/" + fileName;
    photo.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Student photo uploaded successfully");
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
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
    hashedPassword,
    `students/${fileName}`,
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
    unlinkSync(`uploads/students${student.photo}`); // remove photo if there is error
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
    status,
  } = req.body;

  if (req.files && req.files.photo) {
    const { photo } = req.files;

    if (photo) {
      var fileName =
        Number(new Date()).toString(32) +
        Math.random().toString(32).substring(2); // dynamic file name
      let ext = photo.name.split(".").pop();
      fileName = fileName + "." + ext;
      let uploadPath = "uploads/students/" + fileName;
      photo.mv(uploadPath, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("Student photo uploaded successfully");
      });
      student.photo = `students/${fileName}`;
    }
  }
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
  student.password = password
    ? await bcrypt.hash(password, 10)
    : student.password;
  student.status = status || student.status;

  try {
    await student.update();
    res.json({
      status: "success",
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    unlinkSync("uploads/students" + student.photo); // remove uploaded file when error surfaces
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

const paymentBalance = async (req, res) => {
  const { id, programme_id } = req.params; // student id & programme id
  let amount_paid, amount_balance, tuition;
  const sql = `SELECT SUM(amount) AS amount_paid FROM payments WHERE student_id = ?`;
  const [results] = await conn.execute(sql, [id]); // where id refers to student id
  amount_paid = results[0].amount_paid;
  const query = `SELECT tuition FROM programmes WHERE id = ?`;
  const [rows] = await conn.execute(query, [programme_id]); // where programme_id refers to programme id
  tuition = rows[0].tuition;
  amount_balance = tuition - amount_paid;
  res.json({
    status: "success",
    message: "Student balance retrieved successfully",
    data: { amount_paid, amount_balance, tuition },
  });
};

const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findByEmail(email);
  if (!student) {
    return res.json({
      status: "failed",
      message: "Student does not exist",
    });
  }

  const passwordCheck = bcrypt.compareSync(password, student.password); // return boolean
  if (!passwordCheck) {
    return res.json({
      status: "failed",
      message: "Invalid password",
    });
  }

  return res.json({
    status: "success",
    message: "Student login successfully",
    data: student,
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  programmeEnroll,
  paymentBalance,
  studentLogin,
};
