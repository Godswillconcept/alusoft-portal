const conn = require("./connection");
class Course {
  constructor(name, description, duration) {
    this.name = name;
    this.description = description;
    this.duration = duration;
  }

  // CRUD - Create, Read/Retrieve, Update, Delete
  async create() {
    const columns = ["name", "description", "duration"];
    const values = [this.name, this.description, this.duration];
    const ent = "?".repeat(columns.length).split("").join(", ");
    try {
      const sql = `INSERT INTO courses (${columns.join(", ")}) VALUES(${ent})`;
      const [result] = await conn.execute(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM courses`;
    try {
      const [result] = await conn.execute(sql);
      return result;
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
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  async update(id) {
    const sql = `UPDATE courses SET name = ?, description = ?, duration = ? WHERE id = ?`;
    const values = [this.name, this.description, this.duration, id];
    try {
      const [result] = await conn.execute(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    const sql = `DELETE FROM courses WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Course;
