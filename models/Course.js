const conn = require("./connection");
class Course {
  constructor(name, description, duration, id = null) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.id = id;
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }

  // CRUD - Create, Read/Retrieve, Update, Delete
  async create() {
    const columns = [
      "name",
      "description",
      "duration",
      "created_at",
      "updated_at",
    ];
    const values = [
      this.name,
      this.description,
      this.duration,
      this.created_at,
      this.updated_at,
    ];
    const ent = "?".repeat(columns.length).split("").join(", ");
    try {
      const sql = `INSERT INTO courses (${columns.join(", ")}) VALUES(${ent})`;
      const [result] = await conn.execute(sql, values);
      this.id = result.insertId;
      return this;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM courses`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql);
      for (let row of rows) {
        results.push(
          new Course(
            row.name,
            row.description,
            row.duration,
            row.id,
            row.created_at,
            row.updated_at
          )
        );
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM courses WHERE id = ?`;
    try {
      const [results] = await conn.execute(sql, [id]);
      if (results.length === 0) {
        return null;
      }
      return new Course(
        results[0].name,
        results[0].description,
        results[0].duration,
        results[0].id,
        results[0].created_at,
        results[0].updated_at
      );
    } catch (error) {
      throw error;
    }
  }

  async update() {
    this.updated_at = Date.now();
    const sql = `UPDATE courses SET name = ?, description = ?, duration = ?, updated_at = ? WHERE id = ?`;
    const values = [
      this.name,
      this.description,
      this.duration,
      this.updated_at,
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
    const sql = `DELETE FROM courses WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

}
module.exports = Course;
