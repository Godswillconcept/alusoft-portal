const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alusoft_portal",
});

conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected successfully");
});

module.exports = conn.promise();