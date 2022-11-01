//Dependencies
const inquirer = require("inquirer");
const db = require("./db/connection");
require ("console.table")

const employeetracker =  () =>{
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.prompt) {
        case "View All Employees":
          viewAllEmployees();
          break;
      }
    });
  //viewing the employees
};
  
function viewAllEmployees() {
    db.query("SELECT * FROM employee",(err, res)=>{
        if(err) throw err
        console.table(res)
    })
}

//update employee role
//view all roles
//add roles
//view all departments
//add department

employeetracker()