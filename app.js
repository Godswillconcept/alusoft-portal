const express = require("express");
const app = express();
const { join } = require("path");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3000;
const adminRoute = require("./routes/admin");
const clientRoute = require("./routes/client");
const fileUpload = require("express-fileupload");

// middlewares
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // encoding url
app.use(express.static("uploads"));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // file size limit of 50mb
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);
// set view engines
app.set("view engine", "ejs");
app.set("views", "views");

// routes
app.use("/admin", adminRoute);
app.use(clientRoute);

app.get("/", (req, res) => {
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

app.listen(PORT, () =>
  console.log(
    `Server listening at port:${PORT} \nvisit http://localhost:${PORT}`
  )
);
