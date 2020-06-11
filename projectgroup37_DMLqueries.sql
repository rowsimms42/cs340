-- CS 340 - Project Group 37
-- The below queries will be used to implement ALL the
-- functionalities listed in the Project Specs.

-- get all Dorm IDs and Names to populate the Dorm selection dropdown in adding students
SELECT dorm_id, name FROM Dorms

-- get all Major IDs and Names to populate the Major selection dropdown / How do we add an option for NULL to drop down?
SELECT major_id, name FROM Majors

-- get all Major names to populate the department selection dropdown in adding classes
SELECT major_name FROM Majors

-- get all Students to list on the Students page
SELECT student_id, student_fname, student_lname, email, gpa, major_id, dorm_id FROM Students

-- get all Majors to list on the Majors page
SELECT major_id, major_name, dept_chair, required_units FROM Majors

-- get all Dorms to list on the Dorms page
SELECT dorm_id, dorm_name, dorm_address, dorm_capacity FROM Dorms

-- get all Classes to list on the Classes page
SELECT class_id, class_name, department, class_capacity FROM Classes

-- get all Registrations to list on the Registration page
SELECT registration_id, reg_student_id, student_fname, student_lname, class_name, reg_class_id FROM Registrations, Students, Classes WHERE reg_student_id=student_id and reg_class_id=class_id

--gets all rows with a given student id in Registrations, with information from linked rows in Students and Classes using fks reg_student_id and reg_class_id
SELECT reg_student_id, student_fname, student_lname, class_name, reg_class_id FROM Registrations, Students, Classes WHERE reg_student_id=student_id and reg_class_id=class_id and reg_student_id=?

--gets 3 attributes from all rows in Students to populate dropdown for adding registration
SELECT student_id, student_fname, student_lname FROM Students

--function gets 2 attributes from all rows in Classes to populate dropdown for adding registration
SELECT class_id, class_name FROM Classes

-- get a single Student's data for lookup on Students page and the Update Student form
SELECT student_id, student_fname, student_lname, email, gpa, major_id, dorm_id FROM Students WHERE student_id=?

-- get a single Major's data for Update Majors form
SELECT major_id, major_name, dept_chair, required_units FROM Majors WHERE major_id=?

-- get a single Dorm's data for Update Dorms form
SELECT dorm_id, dorm_name, dorm_address, dorm_capacity FROM Dorms WHERE dorm_id=?

-- get a single Class's data for Update Classes form
SELECT class_id, class_name, department, class_capacity FROM Classes WHERE class_id=?

-- get a single Student's Registration data for lookup on Registration page and the Update Registration form
SELECT student_id, cid1, cid2, cid3, cid4, cid5 FROM Registration WHERE student_id=?

-- add a new Major - how to add major_id value as auto increment (not input based)?
INSERT INTO Majors (major_name, dept_chair, required_units) VALUES (?,?,?)

-- add a new Dorm - add dorm_id value as auto increment (not input)?
INSERT INTO Dorms (dorm_name, dorm_address, dorm_capacity) VALUES (?,?,?)

-- add a new Class - add class_id value automatically?
INSERT INTO Classes (class_name, department, class_capacity) VALUES (?,?,?)

-- add a new Student -- add studentv_id value automatically?
INSERT INTO Students (student_fname, student_lname, email, gpa, dorm_id, major_id) VALUES (?,?,?,?,?,?)

-- add a new Registration, associate a Student with classes (M-to-M relationship addition)
INSERT INTO Registrations (reg_student_id, reg_class_id) VALUES (?,?)

-- update a Student's data based on submission of the Update Student form 
UPDATE Students SET student_fname=?, student_lname=?, email=?, gpa=?, major_id=?, dorm_id=? WHERE student_id=?

-- update a Major's data based on submission of the Update Major form 
UPDATE Majors SET major_name=?, dept_chair=?, required_units=? WHERE major_id=?

-- update a Dorm's data based on submission of the Update Dorm form 
UPDATE Dorms SET dorm_name=?, dorm_address=?, dorm_capacity=? WHERE dorm_id=?

-- update a Class' data based on submission of the Update Class form 
UPDATE Classes SET class_name=?, department=?, class_capacity=? WHERE class_id=?

-- delete a Student
DELETE FROM Students WHERE student_id=?

-- dis-associate a certificate from a person (M-to-M relationship deletion)
DELETE FROM Registrations WHERE registration_id=?
