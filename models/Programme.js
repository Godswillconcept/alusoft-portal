const conn = require("./connection");

class Programme {
  constructor(name, description, session, tuition, id = null) {
    this.name = name;
    this.description = description;
    this.session = session;
    this.tuition = tuition;
    this.id = id;
  }

  // CRUD - Create, Read/Retrieve, Update, Delete
  async create() {
    const columns = ["name", "description", "session", "tuition"];
    const values = [this.name, this.description, this.session, this.tuition];
    const ent = "?".repeat(columns.length).split("").join(", ");
    try {
      const sql = `INSERT INTO programmes (${columns.join(
        ", "
      )}) VALUES(${ent})`;
      const [result] = await conn.execute(sql, values);
      this.id = result.insertId;
      return this
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM programmes`;
    const results = [];
    try {
      const [rows] = await conn.execute(sql);
      for (let row of rows) {
        results.push(
          new Programme(
            row.id,
            row.name,
            row.description,
            row.session,
            row.tuition
          )
        );
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM programmes WHERE id = ?`;
    try {
      const [results] = await conn.execute(sql, [id]);
      if (results.length === 0) {
        return null;
      }
      return new Programme(
        results[0].id,
        results[0].name,
        results[0].description,
        results[0].session,
        results[0].tuition
      );
    } catch (error) {
      throw error;
    }
  }

  async update() {
    const sql = `UPDATE programmes SET name = ?, description = ?, session = ?, tuition = ? WHERE id = ?`;
    const values = [
      this.name,
      this.description,
      this.session,
      this.tuition,
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
    const sql = `DELETE FROM programmes WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    const sql = `DELETE FROM programmes WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Programme;
