const express = require("express");
const app = express();
const { join } = require("path");
const conn = require("./models/connection");
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

app.get("/students", (req, res) => {
  res.render("students");
});

app.get("/courses", async (req, res) => {
  const sql = `SELECT * FROM courses`;
  const [courses] = await conn.query(sql);
  res.render("courses", { courses });
});

app.get("/courses/create", (req, res) => {
  res.render("create-course");
});

app.post("/courses", async (req, res) => {
  const { name, description, duration } = req.body;
  // res.json(req.body);
  const sql = `INSERT INTO courses (name, description, duration) VALUES (?, ?, ?)`;
  try {
    const values = [name.trim(), description.trim(), duration];
    const [result] = await conn.query(sql, values);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () =>
  console.log(
    `Server listening at port:${PORT} \n visit http://localhost:${PORT}`
  )
);
