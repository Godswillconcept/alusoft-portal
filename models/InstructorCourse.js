const conn = require("./connection");

class InstructorCourse {
  constructor(course_id, instructor_id, id = null) {
    this.course_id = course_id;
    this.instructor_id = instructor_id;
    this.id = id;
  }

  async create() {
    const columns = ["course_id", "instructor_id"];
    const values = [
      this.course_id,
      this.instructor_id,
    ];
    const ent = "?,".repeat(columns.length).slice(0, -1);
    try {
      const sql = `INSERT INTO instructor_courses (${columns.join(
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
    const sql = `SELECT * FROM instructor_courses`;
    try {
      const [rows] = await conn.execute(sql);
      return rows.map(
        (row) =>
          new InstructorCourse(
            row.course_id,
            row.instructor_id,
            row.id,
          )
      );
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM instructor_courses WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [id]);
      if (result.length === 0) {
        return null;
      }
      return new InstructorCourse(
        result[0].course_id,
        result[0].instructor_id,
        result[0].id,
      );
    } catch (error) {
      throw error;
    }
  }
  static async findCoursesByInstructor(instructor_id) {
    const sql = `SELECT course_id FROM instructor_courses WHERE instructor_id = ?`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql, [instructor_id]);
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
    const sql = `UPDATE instructor_courses SET course_id = ?, instructor_id = ?, WHERE id = ?`;
    const values = [this.course_id, this.instructor_id, this.id];
    try {
      const [result] = await conn.execute(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    const sql = `DELETE FROM instructor_courses WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InstructorCourse;
