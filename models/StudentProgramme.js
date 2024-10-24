const conn = require("./connection");

class StudentProgramme {
  constructor(student_id, programme_id, id = null) {
    this.student_id = student_id;
    this.programme_id = programme_id;
    this.id = id;
  }

  // CRUD - Create, Read/Retrieve, Update, Delete
  async create() {
    const sql = `INSERT INTO student_programmes (student_id, programme_id) VALUES (?, ?)`; // ? = placeholders
    const values = [this.student_id, this.programme_id];
    try {
      const [result] = await conn.execute(sql, values);
      this.id = result.insertId;
      return this;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM student_programmes`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql);
      for (let row of rows) {
        results.push(
          new StudentProgramme(row.id, row.student_id, row.programme_id)
        );
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM student_programmes WHERE id = ?`;
    try {
      const [results] = await conn.execute(sql, [id]);
      if (results.length === 0) {
        return null;
      }
      return new StudentProgramme(
        results[0].id,
        results[0].student_id,
        results[0].programme_id
      );
    } catch (error) {
      throw error;
    }
  }

  static async findStudentsByProgramme(programme_id) {
    const sql = `SELECT student_id FROM student_programmes WHERE programme_id = ?`;
    const results = [];
    try {
      const [rows] = await conn.execute(sql, [programme_id]);
      for (let row of rows) {
        results.push(row.student_id);
      }
      return results;
    } catch (error) {
      throw error;
    }
  }
  async update() {
    const sql = `UPDATE student_programmes SET student_id = ?, programme_id = ? WHERE id = ?`;
    const values = [this.student_id, this.programme_id, this.id];
    try {
      const [result] = await conn.execute(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    const sql = `DELETE FROM student_programmes WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StudentProgramme;
