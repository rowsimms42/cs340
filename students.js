module.exports = function(){
    var express = require('express');
    var router = express.Router();

/*get students to populate*/
function getStudents(req, mysql, context, complete){
	mysql.pool.query("SELECT student_id, fname, lname, email, gpa, major_id, dorm_id FROM Students", function(error, results, fields){
	if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }
/*get single student*/
function getStudent(res, mysql, context, id, complete){
        var sql = "SELECT student_id, fname, lname, email, gpa, major_id, dorm_id FROM Students WHERE student_id = :student_ID_selected_from_students_page";
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

/*add a student*/
router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students (fname, lname, email, gpa, dorm_id, major_id) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.email, req.body.gpa, req.body.dorm_id, req.body.major_id];
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
}

    
