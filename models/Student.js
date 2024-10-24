const conn = require("./connection");

class Student {
  constructor(
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
    id = null
  ) {
    this.surname = surname;
    this.first_name = first_name;
    this.other_name = other_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.dob = dob;
    this.gender = gender;
    this.guardian_name = guardian_name;
    this.guardian_phone = guardian_phone;
    this.guardian_email = guardian_email;
    this.guardian_address = guardian_address;
    this.password = password;
    this.photo = photo;
    this.status = status;
    this.id = id;
  }

  // CRUD Operations
  async create() {
    const columns = [
      "surname",
      "first_name",
      "other_name",
      "email",
      "phone",
      "address",
      "dob",
      "gender",
      "guardian_name",
      "guardian_phone",
      "guardian_email",
      "guardian_address",
      "password",
      "photo",
      "status",
    ];

    const values = [
      this.surname,
      this.first_name,
      this.other_name,
      this.email,
      this.phone,
      this.address,
      this.dob,
      this.gender,
      this.guardian_name,
      this.guardian_phone,
      this.guardian_email,
      this.guardian_address,
      this.password,
      this.photo,
      this.status,
    ];

    const ent = "?".repeat(columns.length).split("").join(", ");
    const sql = `INSERT INTO students (${columns.join(", ")}) VALUES (${ent})`;
    try {
      const [result] = await conn.execute(sql, values); // insert
      this.id = result.insertId;
      return this;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM students`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql);
      for (let row of rows) {
        results.push(
          new Student(
            row.surname,
            row.first_name,
            row.other_name,
            row.email,
            row.phone,
            row.address,
            row.dob,
            row.gender,
            row.guardian_name,
            row.guardian_phone,
            row.guardian_email,
            row.guardian_address,
            row.password,
            row.photo,
            row.status,
            row.id
          )
        );
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM students WHERE id =?`;
    try {
      const [rows] = await conn.execute(sql, [id]);
      if (rows.length === 0) {
        return null;
      }
      return new Student(
        rows[0].surname,
        rows[0].first_name,
        rows[0].other_name,
        rows[0].email,
        rows[0].phone,
        rows[0].address,
        rows[0].dob,
        rows[0].gender,
        rows[0].guardian_name,
        rows[0].guardian_phone,
        rows[0].guardian_email,
        rows[0].guardian_address,
        rows[0].password,
        rows[0].photo,
        rows[0].status,
        rows[0].id
      );
    } catch (error) {
      throw error;
    }
  }

  async update() {
    const columns = [
      "surname",
      "first_name",
      "other_name",
      "email",
      "phone",
      "address",
      "dob",
      "gender",
      "guardian_name",
      "guardian_phone",
      "guardian_email",
      "guardian_address",
      "password",
      "photo",
      "status",
    ];

    const values = [
      this.surname,
      this.first_name,
      this.other_name,
      this.email,
      this.phone,
      this.address,
      this.dob,
      this.gender,
      this.guardian_name,
      this.guardian_phone,
      this.guardian_email,
      this.guardian_address,
      this.password,
      this.photo,
      this.status,
    ];

    const sql = `UPDATE students SET ${columns
      .map((column) => `${column} = ?`)
      .join(", ")} WHERE id =?`;
    try {
      const [result] = await conn.execute(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    const sql = `DELETE FROM students WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    const sql = `DELETE FROM students WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    const sql = `SELECT * FROM students WHERE email = ?`;
    try {
      const [rows] = await conn.execute(sql, [email]);
      if (rows.length === 0) {
        return null;
      }
      return new Student(
        rows[0].id,
        rows[0].surname,
        rows[0].first_name,
        rows[0].other_name,
        rows[0].email,
        rows[0].phone,
        rows[0].address,
        rows[0].dob,
        rows[0].gender,
        rows[0].guardian_name,
        rows[0].guardian_phone,
        rows[0].guardian_email,
        rows[0].guardian_address,
        rows[0].password,
        rows[0].photo,
        rows[0].status
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Student;
