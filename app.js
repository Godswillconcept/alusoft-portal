const express = require("express");
const app = express();
const { join } = require("path");
const conn = require("./models/connection");
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
  res.render("index");
});

app.get("/instructors", async (req, res) => {
  const sql = `SELECT * FROM instructors`;
  const [instructors] = await conn.execute(sql);
  res.json({
    status: "success",
    message: "Fetching all instructors",
    data: instructors,
  });
});

app.post("/instructors", async (req, res) => {
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
  console.log(req.body);
  const sql = `INSERT INTO instructors (title, surname, first_name, other_name, gender, email, address, phone, dob, employment_date, photo, password, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  console.log(sql);
  try {
    const values = [
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
    ];
    console.log(values);
    await conn.execute(sql, values);
    res.json({ status: "success", message: "New instructor has been created" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/programmes", async (req, res) => {
  const sql = `SELECT * FROM programmes`;
  const [programmes] = await conn.query(sql);
  res.json({
    status: "success",
    message: "fetching all programmes",
    data: programmes,
  });
  // res.render("programmes", { programmes });
});

app.post("/programmes", async (req, res) => {
  const { name, description, tuition, session } = req.body;

  const sql = `INSERT INTO programmes (name, description, tuition, session) VALUES (?, ?, ?, ?)`;
  try {
    const values = [name, description, tuition, session];
    await conn.execute(sql, values);
    res.json({
      status: "success",
      message: "new programme created successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/students", async (req, res) => {
  const sql = `SELECT * FROM students`;
  const [students] = await conn.query(sql);
  // res.render("students");
  res.json({
    status: "success",
    message: "Fetching all students",
    data: students,
  });
});

app.post("/students", async (req, res) => {
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
  const sql = `INSERT INTO students (surname, first_name, other_name, email, phone, address, dob, gender, guardian_name, guardian_phone, guardian_email, guardian_address, password, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const values = [
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
    ];
    console.log(values);
    await conn.execute(sql, values);
    res.json({
      status: "success",
      message: "New student created successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/courses", async (req, res) => {
  const sql = `SELECT * FROM courses`;
  const [courses] = await conn.query(sql);
  res.json({
    status: "success",
    message: "Fetching all courses",
    data: courses,
  });
});

app.post("/courses", async (req, res) => {
  const { name, description, duration } = req.body;
  // res.json(req.body);
  const sql = `INSERT INTO courses (name, description, duration) VALUES (?, ?, ?)`;
  try {
    const values = [name.trim(), description.trim(), duration];
    const [result] = await conn.query(sql, values);
    // res.send(result);
    res.json({ status: "success", message: "New course created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () =>
  console.log(
    `Server listening at port:${PORT} \nvisit http://localhost:${PORT}`
  )
);
