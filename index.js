//Dependencies 
const inquirer = require('inquirere');
const db = require('./db/connection');

db.connect(err =>{
    if (err) throw err;
    console.log('Connected to Database');
    employeetracker();
});

var employeetracker = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?'
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }]).then((answers)=>{
        //viewing the employees
      else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) =>{
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                employeetracker();
            });
         //add an employee
    } else if (answers.prompt ==='Add Employee') {
        db.query(`Select * From employee, role`, (err, result)=>{
            if (err) throw err;
            inquirer.prompt([
                {
                    //add employee first name
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employees first name?',
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log('Add a first name');
                            return false;
                        }
                    }
                }
            ])
        })
    }
    
}

//update employee role
//view all roles
//add roles
//view all departments
//add department