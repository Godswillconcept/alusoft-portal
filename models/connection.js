require("dotenv").config();
const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'alusoft_portal',
});

conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected successfully");
});

module.exports = conn.promise();
