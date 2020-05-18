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
SELECT student_id, fname, lname, email, gpa, major_id, dorm_id FROM Students

-- get all Majors to list on the Majors page
SELECT major_id, major_name, dept_chair, required_units FROM Majors

-- get all Dorms to list on the Dorms page
SELECT dorm_id, dorm_name, dorm_address, dorm_capacity FROM Dorms

-- get all Classes to list on the Classes page
SELECT class_id, class_name, department, class_capacity FROM Classes

-- get all Registrations to list on the Registration page
SELECT student_id, cid1, cid2, cid3, cid4, cid5 FROM Registration

-- get a single Student's data for lookup on Students page and the Update Student form
SELECT student_id, fname, lname, email, gpa, major_id, dorm_id FROM Students WHERE student_id = :student_ID_selected_from_students_page

-- get a single Major's data for Update Majors form
SELECT major_id, major_name, dept_chair, required_units FROM Majors WHERE major_id = :major_ID_selected_from_majors_page

-- get a single Dorm's data for Update Dorms form
SELECT dorm_id, dorm_name, dorm_address, dorm_capacity FROM Dorms WHERE dorm_id = :dorm_ID_selected_from_dorms_page

-- get a single Class's data for Update Classes form
SELECT class_id, class_name, department, class_capacity FROM Classes WHERE class_id = :class_ID_selected_from_classes_page

-- get a single Student's Registration data for lookup on Registration page and the Update Registration form
SELECT student_id, cid1, cid2, cid3, cid4, cid5 FROM Registration WHERE student_id = :student_ID_selected_from_registration_page

-- add a new Major - how to add major id as auto increment?
INSERT INTO Majors (major_id, major_name, dept_chair, required_units) VALUES (:major_idInput, :major_nameInput, :dept_chairInput, :required_unitsInput)

-- add a new Dorm
INSERT INTO Dorms (dorm_id, dorm_name, dorm_address, dorm_capacity) VALUES (:dorm_idInput, :dorm_nameInput, :dorm_addressInput, :dorm_capacityInput)

-- add a new Class
INSERT INTO Classes (class_id, class_name, department, class_capacity) VALUES (:class_idInput, :class_nameInput, :department_from_dropdown_Input, :class_capacityInput)

-- add a new Student
INSERT INTO Students (student_id, fname, lname, email, gpa, dorm_id, major_id) VALUES (:student_idInput, :fnameInput, :lnameInput, :emailInput, :gpaInput, :dorm_id_from_dropdown_Input, :major_id_from_dropdown_Input)

-- add a new Registration, associate a Student with classes (M-to-M relationship addition)
INSERT INTO Registration (student_id, cid1, cid2, cid3, cid4, cid5) VALUES (:student_idInput, :cid1Input, :cid2Input, :cid3Input, :cid4Input, :cid5Input)

-- update a Student's data based on submission of the Update Student form 
UPDATE Students SET fname = :fnameInput, lname= :lnameInput, email = :emailInput, gpa = :gpaInput, dorm_id = dorm_idInput, major_id = major_idInput WHERE student_id= :student_ID_selected_from_students_page

-- update a Major's data based on submission of the Update Major form 
UPDATE Majors SET major_name = :major_nameInput, dept_chair = :dept_chairInput, required_units = :required_unitsInput WHERE major_id= :major_ID_selected_from_majors_page

-- update a Dorm's data based on submission of the Update Dorm form 
UPDATE Dorms SET dorm_name = :dorm_nameInput, dorm_address = :dorm_addressInput, dorm_capacity = :dorm_capacityInput WHERE dorm_id= :dorm_ID_selected_from_dorms_page

-- update a Class' data based on submission of the Update Class form 
UPDATE Classes SET class_name = :class_nameInput, department = :department_from_dropdown_Input, class_capacity = :class_capacityInput WHERE class_id= :class_ID_selected_from_classes_page

-- update a Registration's data based on submission of the Update Registration form 
UPDATE Registration SET cid1 = :cid1Input, cid2 = :cid2Input, cid3 = :cid3Input, cid4 = :cid4Input, cid5 = :cid5Input WHERE student_id= :student_ID_selected_from_registration_page

-- delete a Student
DELETE FROM Students WHERE student_id = :student_ID_selected_from_student_delete_form

-- delete a Major
DELETE FROM Majors WHERE major_id = :major_ID_selected_from_delete_form

-- delete a Dorm
DELETE FROM Dorms WHERE dorm_id = :dorm_ID_selected_from_delete_form

-- delete a Class
DELETE FROM Classes WHERE class_id = :class_ID_selected_from_delete_form

-- dis-associate a certificate from a person (M-to-M relationship deletion)
DELETE FROM Registration WHERE student_id = :student_ID_selected_from_registration_delete_form