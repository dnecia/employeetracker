USE employeetracker;

INSERT INTO department(id,name)
VALUES 
(1,"FINANCE"),
(2,"HR"),
(3, "SALES"),
(4, "ENGINEERING");

INSERT INTO role(id,title,salary,department_id)
VALUES
(1, "ACCOUNTANT", 70000, 1),
(2, "FRONT END DEVELOPER", 100000, 4),
(3, "SALES LEAD", 80000, 3),
(4, "ACCOUNTANT MANAGER", 90000, 1),
(5, "RECRUITER", 70000, 2),
(6, "SENIOR ENGINEER", 110000, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Mike", "Cole", 4, NULL),
(2, "Kathy", "John", 6, NULL),
(3, "Paul", "Williams", 3, NULL),
(4,"John", "smith", 1, 1 ),
(5, "Sally", "Shaw", 2, 2),
(6, "John", "Dolly", 5, NULL);

