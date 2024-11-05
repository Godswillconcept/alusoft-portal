const conn = require("./connection");
class Instructor {
  constructor(
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
    id = null
  ) {
    this.title = title;
    this.surname = surname;
    this.first_name = first_name;
    this.other_name = other_name;
    this.gender = gender;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.dob = dob;
    this.employment_date = employment_date;
    this.photo = photo;
    this.password = password;
    this.status = status;
    this.id = id;
  }

  // CRUD Operations
  async create() {
    const columns = [
      "title",
      "surname",
      "first_name",
      "other_name",
      "gender",
      "email",
      "address",
      "phone",
      "dob",
      "employment_date",
      "photo",
      "password",
    ];
    const values = [
      this.title,
      this.surname,
      this.first_name,
      this.other_name,
      this.gender,
      this.email,
      this.address,
      this.phone,
      this.dob,
      this.employment_date,
      this.photo,
      this.password,
    ];
    const ent = "?".repeat(columns.length).split("").join(", "); // ? = placeholder
    try {
      const sql = `INSERT INTO instructors (${columns.join(
        ", "
      )}) VALUES (${ent})`;
      const [result] = await conn.execute(sql, values);
      this.id = result.insertId;
      return this;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM instructors`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql);
      for (let row of rows) {
        results.push(
          new Instructor(
            row.title,
            row.surname,
            row.first_name,
            row.other_name,
            row.gender,
            row.email,
            row.address,
            row.phone,
            row.dob,
            row.employment_date,
            row.photo,
            row.password,
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
    const sql = `SELECT * FROM instructors WHERE id = ?`;
    try {
      const [results] = await conn.execute(sql, [id]);
      if (results.length === 0) {
        return null;
      }
      return new Instructor(
        results[0].title,
        results[0].surname,
        results[0].first_name,
        results[0].other_name,
        results[0].gender,
        results[0].email,
        results[0].address,
        results[0].phone,
        results[0].dob,
        results[0].employment_date,
        results[0].photo,
        results[0].password,
        results[0].status,
        results[0].id
      );
    } catch (error) {
      throw error;
    }
  }

  async update() {
    const sql = `UPDATE instructors SET title =?, surname =?, first_name =?, other_name =?, gender =?, email =?, address =?, phone =?, dob =?, employment_date =?, photo =?, password =?, status =? WHERE id =?`;
    const values = [
      this.title,
      this.surname,
      this.first_name,
      this.other_name,
      this.gender,
      this.email,
      this.address,
      this.phone,
      this.dob,
      this.employment_date,
      this.photo,
      this.password,
      this.status,
      this.id,
    ];
    try {
      const [result] = await conn.execute(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    const sql = `DELETE FROM instructors WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    const sql = `SELECT * FROM instructors WHERE email = ?`;
    try {
      const [results] = await conn.execute(sql, [email]);
      if (results.length === 0) {
        return null;
      }
      return new Instructor(
        results[0].title,
        results[0].surname,
        results[0].first_name,
        results[0].other_name,
        results[0].gender,
        results[0].email,
        results[0].address,
        results[0].phone,
        results[0].dob,
        results[0].employment_date,
        results[0].photo,
        results[0].password,
        results[0].status,
        results[0].id
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Instructor;
