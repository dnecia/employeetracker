const { builtinModules } = require("module");
const mysql = require("mysql12");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employeetracker",
});

builtinModules.exports = db;
