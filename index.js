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
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
             updateEmployeeRole();
             break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "Add Role":
            addRole();
            break;
        case "View All Departments":
            viewAllDepartments();
            break;
        case "Add Department":
            addDepartments();
            break;
        default:
            quit();
      }
    });
  //viewing the employees
};
  
function viewAllEmployees() {
    db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id",(err, res)=>{
        if(err) throw err
        console.table(res)
        employeetracker()
    })
}

function addEmployee() {
    db.query("SELECT * FROM role ", (err,res)=> {
        if (err) throw err
        let roles = res.map((role)=>({
            name: role.title,
            value: role.id
        }))

        db.query("SELECT * FROM employee", (err,res)=>{
            if (err) throw err
            let employees = res.map((employee)=>({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }))
        

    
    inquirer.prompt([
        {
        type: "input",
        message: "Please input employee's first name",
        name: "firstName"
        },
        {
            type: "input",
            message: "Please input employee's last name",
            name: "lastName"

        },
        {
            type: "list",
            message: "What is the new employee's role?",
            name: "empRole",
            choices: roles
        },
        {
            type: "list",
            message: "What is the new employee's manager?",
            name: "empManager",
            choices: employees
        },


    ])
    .then((answers)=>{
       db.query(`INSERT INTO employee SET ?`, {
           first_name: answers.firstName,
           last_name: answers.lastName,
           role_id: answers.empRole,
           manager_id: answers.empManager
       },(err, res)=>{
           if (err) throw err
           console.log(`${answers.firstName},${answers.lastName} has been added to database`)
           employeetracker()
       })
    })
})
})
}

  

function updateEmployeeRole() {
    db.query("SELECT * FROM  role",(err, res)=>{
        if(err) throw err
        let roles = res.map((role)=>({
            name: role.title,
            value: role.id
        }))
        db.query("SELECT * FROM employee", (err,res)=>{
            if (err) throw err
            let employees = res.map((employee)=>({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            })) 
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update the role for?",
                    name: "employee",
                    choices: employees
                },
                {
                    type: "list",
                    message: "What should be the employee's new role?",
                    name: "empRole",
                    choices: roles
                },
              
            ]) .then((answers)=>{
                db.query(`UPDATE employee SET ? WHERE ?`,[{role_id:answers.empRole},{id:answers.employee}],(err,res)=>{
                    console.log("employee's role was updated")
                    employeetracker()
                })
            })
        })
        
    })
}
function viewAllRoles() {
    db.query("SELECT * FROM role",(err, res)=>{
        if(err) throw err
        console.table(res)
        employeetracker()
    })
}
//function addRole() {
function viewAllDepartments() {
    db.query("SELECT * FROM department",(err, res)=>{
        if(err) throw err
        console.table(res)
        employeetracker()
    })
}
function addDepartments () {
    inquirer.prompt([
        {
            type: "input",
            name: "deptname",
            message: "What is the name of the new Department you would like to add?"
        }
    ]) .then((answer)=>{
        db.query(`INSERT INTO department SET ?`, {name:answer.deptname},(err,res)=>{
            if (err) throw err
            console.log(`${answer.deptname} added to department`)
            employeetracker()
        }) 
    })
}





//update employee role
//view all roles
//add roles
//view all departments
//add department
function quit() {
    process.exit()
}
employeetracker()
