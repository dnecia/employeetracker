const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employeetracker",
  password: "password",
});

module.exports = db;
