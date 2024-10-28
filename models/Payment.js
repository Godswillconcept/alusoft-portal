const conn = require("./connection");

class Payment {
  constructor(
    student_id,
    programme_id,
    amount,
    payment_date,
    payment_method,
    id = null
  ) {
    this.student_id = student_id;
    this.programme_id = programme_id;
    this.amount = amount;
    this.payment_date = payment_date;
    this.payment_method = payment_method;
    this.id = id;
  }

  // CRUD - Create, Read/Retrieve, Update, Delete
  async create() {
    const columns = [
      "student_id",
      "programme_id",
      "amount",
      "payment_date",
      "payment_method",
    ];

    const values = [
      this.student_id,
      this.programme_id,
      this.amount,
      this.payment_date,
      this.payment_method,
    ];
    const ent = "?".repeat(columns.length).split("").join(",");

    try {
      const sql = `INSERT INTO payments (${columns.join(", ")}) VALUES(${ent})`;
      const [result] = await conn.execute(sql, values);
      this.id = result.insertId;
      return this;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const sql = `SELECT * FROM payments`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql);
      for (let row of rows) {
        results.push(
          new Payment(
            row.student_id,
            row.programme_id,
            row.amount,
            row.payment_date,
            row.payment_method,
            row.id,
          )
        );
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM payments WHERE id = ?`;
    try {
      const [results] = await conn.execute(sql, [id]);
      if (results.length === 0) {
        return null;
      }
      return new Payment(
        results[0].student_id,
        results[0].programme_id,
        results[0].amount,
        results[0].payment_date,
        results[0].payment_method,
        results[0].id,
      );
    } catch (error) {
      throw error;
    }
  }

  static async findPaymentByStudent(student_id) {
    const sql = `SELECT * FROM payments WHERE student_id = ?`;
    try {
      const results = [];
      const [rows] = await conn.execute(sql, [student_id]);
      for (let row of rows) {
        results.push(
          new Payment(
            row.student_id,
            row.programme_id,
            row.amount,
            row.payment_date,
            row.payment_method,
            row.id
          )
        );
      }
      return results;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    const sql = `UPDATE payments SET student_id = ?, programme_id = ?, amount = ?, payment_date = ?, payment_method = ? WHERE id = ?`;
    const values = [
      this.student_id,
      this.programme_id,
      this.amount,
      this.payment_date,
      this.payment_method,
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
    const sql = `DELETE FROM payments WHERE id = ?`;
    try {
      const [result] = await conn.execute(sql, [this.id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Payment;
