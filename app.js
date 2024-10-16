const express = require("express");
const app = express();
const { join } = require("path");
const conn = require("./models/connection");
const Course = require("./models/Course");
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

app.delete("/courses/:id/delete", async (req, res) => {
  const { id } = req.params; // destructuring the id from  request parameter object
  try {
    const course = await Course.delete(id); // deleting course in the database
    res.json({
      status: "success",
      message: "Course deleted successfully",
      data: course,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Deleting entry failed",
      data: error,
    });
  }
})
app.put("/courses/:id/update", async (req, res) => {
  const { id } = req.params; // destructuring the id from  request parameter object
  const { name, description, duration } = req.body; // destructuring data from req.body
  const course = new Course(name, description, duration); // create course object from Course class
  try {
    const result = await course.update(id); // updating course in the database
    res.json({
      status: "success",
      message: "Course updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Updating entry failed",
      data: error,
    });
  }
});
app.get("/courses/:id", async (req, res) => {
  const { id } = req.params; // destructuring the id from  request parameter object
  try {
    const course = await Course.findById(id);
    if (course) {
      res.json({
        status: "success",
        message: "Course retrieved successfully",
        data: course,
      });
    } else {
      res.json({
        status: "failed",
        message: "Course retrieved failed",
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: "Course retrieved failed",
      data: error,
    });
  }
});
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json({
      status: "success",
      message: "All courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      status: "failed",
      message: "Error while retrieving courses",
      data: error,
    });
  }
});
app.post("/courses", async (req, res) => {
  const { name, description, duration } = req.body; // destructuring data from req.body
  const course = new Course(name, description, duration); // create course object from Course class
  try {
    const result = await course.create(); // create course and saving to database
    res.json({
      status: "success",
      message: "New course created successfully",
      data: result,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      status: "failed",
      message: "Error while creating new entry",
      data: error,
    });
  }
});

app.listen(PORT, () =>
  console.log(
    `Server listening at port:${PORT} \nvisit http://localhost:${PORT}`
  )
);
