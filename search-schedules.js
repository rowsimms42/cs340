module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Function gets all Students for populating the dropdown to select a student to search */
    
    function getStudents(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT registration_id, reg_student_id, student_fname, student_lname FROM Registrations, Students WHERE reg_student_id=student_id", 
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.searchRegistrations = results;
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
            context.studentScheduleName = results[0];
            complete();
        });
    }


    /*Display search page with students populated in drop down. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
    	var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('search-schedules', context);
            }
        }
    });



    /* Display one student's classes from registrations (search page result) */

    router.get('/:reg_student_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteregistration.js"];
        var mysql = req.app.get('mysql');
        getStudentRegistrationSchedule(res, mysql, context, req.params.reg_student_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('search-schedules-result', context);
            }

        }
    });

    return router;

}();
