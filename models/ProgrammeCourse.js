const conn = require("./connection");

class ProgrammeCourse {
  constructor(programme_id, course_id, id = null) {
    this.programme_id = programme_id;
    this.course_id = course_id;
    this.id = id;
  }

  // CRUD - Create, Read/Retrieve, Update, Delete
  async create() {
    const columns = ["programme_id", "course_id"];

    const values = [this.programme_id, this.course_id];

    const ent = "?".repeat(columns.length).split("").join(",");

    try {
      const sql = `INSERT INTO programme_courses (${columns.join(
        ", "
      )}) VALUES(${ent})`;
      const [result] = await conn.execute(sql, values);
      this.id = result.insertId;
      return this;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM programme_courses`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql);
      for (let row of rows) {
        results.push(
          new ProgrammeCourse(row.id, row.programme_id, row.course_id)
        );
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM programme_courses WHERE id = ?`;
    try {
      const [results] = await conn.execute(sql, [id]);
      if (results.length === 0) {
        return null;
      }
      return new ProgrammeCourse(
        results[0].id,
        results[0].programme_id,
        results[0].course_id
      );
    } catch (error) {
      throw error;
    }
  }
  static async findCoursesByProgramme(programme_id) {
    const sql = `SELECT course_id FROM programme_courses WHERE programme_id = ?`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql, [programme_id]);
      if (rows.length === 0) {
        return null;
      }
      for (let row of rows) {
        results.push(row.course_id);
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    const sql = `UPDATE programme_courses SET programme_id = ?, course_id = ? WHERE id = ?`;
    const values = [this.programme_id, this.course_id, this.id];
    try {
      const [result] = await conn.execute(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    const sql = `DELETE FROM programme_courses WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    const sql = `DELETE FROM programme_courses WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProgrammeCourse;
