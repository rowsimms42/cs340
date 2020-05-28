module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT student_id, student_fname, student_lname, email, gpa, major_id, dorm_id FROM Students", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    function getStudent(res, mysql, context, id, complete){
        var sql = "SELECT student_id, student_fname, student_lname, email, gpa, major_id, dorm_id FROM Students WHERE student_id = :student_ID_selected_from_students_page";
        var inserts = [student_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results[0];
            complete();
        });
    }

    router.get('/', function(req, res){
    	var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('students', context);
            }
        }
    });

router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students (student_fname, student_lname, email, gpa, dorm_id, major_id) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.student_fname, req.body.student_lname, req.body.email, req.body.gpa, req.body.dorm_id, req.body.major_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/students');
            }
        });
});
    return router;
}();
