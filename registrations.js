module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Function gets 3 attributes from all rows in Students to populate dropdown for adding registration */

    function getStudentRegistrations(res, mysql, context, complete){
        mysql.pool.query("SELECT student_id, student_fname, student_lname FROM Students", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studentRegistrations = results;
            complete();
        });
    }

    /* Function gets 2 attributes from all rows in Classes to populate dropdown for adding registration */

    function getClassRegistrations(res, mysql, context, complete){
        mysql.pool.query("SELECT class_id, class_name FROM Classes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classRegistrations = results;
            complete();
        });
    }

    /* Function gets all rows in Registrations and information from linked rows in Students and Classes using fks reg_student_id and reg_class_id */
    
    function getRegistrations(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT registration_id, reg_student_id, student_fname, student_lname, class_name, reg_class_id FROM Registrations, Students, Classes WHERE reg_student_id=student_id and reg_class_id=class_id", 
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.registrations = results;
            complete();
        });
    }

    /* Function gets all rows with a given class id in Registrations, with information from linked rows in Students and Classes using fks reg_student_id and reg_class_id */
    
    function getClassRegistrationList(res, mysql, context, reg_class_id, complete){
        var sql = "SELECT reg_student_id, student_fname, student_lname, class_name, reg_class_id FROM Registrations, Students, Classes WHERE reg_student_id=student_id and reg_class_id=class_id and reg_class_id=?";
        var inserts = [reg_class_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classRegistrationList = results;
            complete();
        });
    }

    /* Function gets a single row with a given class id in Registrations, with information from linked row in Classes using fk reg_class_id */
    
    function getClassListName(res, mysql, context, reg_class_id, complete){
        var sql = "SELECT class_name, reg_class_id FROM Registrations, Classes WHERE reg_class_id=class_id and reg_class_id=?";
        var inserts = [reg_class_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classListName = results[0];
            complete();
        });
    }

    /* Function gets all rows with a given student id in Registrations, with information from linked rows in Students and Classes using fks reg_student_id and reg_class_id */
    
    function getStudentRegistrationSchedule(res, mysql, context, reg_student_id, complete){
        var sql = "SELECT reg_student_id, student_fname, student_lname, class_name, reg_class_id FROM Registrations, Students, Classes WHERE reg_student_id=student_id and reg_class_id=class_id and reg_student_id=?";
        var inserts = [reg_student_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studentRegistrationSchedule = results;
            complete();
        });
    }

    /* Function gets a single row with a given student id in Registrations, with information from linked rows in Students using fk reg_student_id */
    
    function getStudentScheduleName(res, mysql, context, reg_student_id, complete){
        var sql = "SELECT reg_student_id, student_fname, student_lname FROM Registrations, Students WHERE reg_student_id=student_id and reg_student_id=?";
        var inserts = [reg_student_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.studentScheduleName = results[0];
            complete();
        });
    }

    /*Display all Registrations. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
    	var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteregistration.js"];
        var mysql = req.app.get('mysql');
        getRegistrations(res, mysql, context, complete);
        getStudentRegistrations(res, mysql, context, complete);
        getClassRegistrations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('registrations', context);
            }
        }
    });


    /* Adds a registration, redirects to the registrations page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Registrations (reg_student_id, reg_class_id) VALUES (?,?)";
        var inserts = [req.body.reg_student_id, req.body.reg_class_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/registrations');
            }
        });
    });
    
    
    /* Display one class list (all students for one class) from registrations */

    router.get('/:reg_class_id', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getClassRegistrationList(res, mysql, context, req.params.reg_class_id, complete);
        getClassListName(res, mysql, context, req.params.reg_class_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('class-registration', context);
            }

        }
    });

    /* Display one student's classes from registrations */

    router.get('/:reg_student_id', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStudentRegistrationSchedule(res, mysql, context, req.params.reg_student_id, complete);
        getStudentScheduleName(res, mysql, context, req.params.reg_student_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('student-registration', context);
            }

        }
    });

    /* Route to delete a registration, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:registration_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Registrations WHERE registration_id=?";
        var inserts = [req.params.registration_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;

}();
