const conn = require("./connection");
class Course {
  constructor(name, description, duration) {
    this.name = name;
    this.description = description;
    this.duration = duration;
  }

  create() {
    const columns = ["name", "description", "duration"];
    const values = [this.name, this.description, this.duration];
    const ent = "?".repeat(columns.length).split("").join(", ");
    const sql = `INSERT INTO courses (${columns.join(", ")}) VALUES(${ent})`;
    const results = conn.query(sql, values);
    return new Course(this.name, this.description, this.duration);
  }
}

const course = new Course("web development", "web development course", 3);
course.create();