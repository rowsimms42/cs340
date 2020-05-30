module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getDormsStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT dorm_id, dorm_name FROM Dorms", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dormStudents  = results;
            complete();
        });
    }

    function getMajorsStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT major_id, major_name FROM Majors", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.majorStudents  = results;
            complete();
        });
    }
    
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

    function getStudent(res, mysql, context, student_id, complete){
        var sql = "SELECT student_id, student_fname, student_lname, email, gpa, major_id, dorm_id FROM Students WHERE student_id=?";
        var inserts = [student_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student = results[0];
            complete();
        });
    }

    /*Display all students. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
    	var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletestudent.js"];
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        getDormsStudents(res, mysql, context, complete);
        getMajorsStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('students', context);
            }
        }
    });

    /* Display one student for the specific purpose of updating students */

    router.get('/:student_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selecteddorm.js", "selectedmajor.js", "updatestudent.js"];
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.student_id, complete);
        getDormsStudents(res, mysql, context, complete);
        getMajorsStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-student', context);
            }

        }
    });

    /* Adds a student, redirects to the students page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students (student_fname, student_lname, email, gpa, major_id, dorm_id) VALUES (?,?,?,?,?,?)";
        if (req.body.major_id == "NULL"){
            var major_id = null;
        }else {major_id = req.body.major_id}
        var inserts = [req.body.student_fname, req.body.student_lname, req.body.email, req.body.gpa, major_id, req.body.dorm_id];
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
    
    /* The URI that update data is sent to in order to update a student */

    router.put('/:student_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Students SET student_fname=?, student_lname=?, email=?, gpa=?, major_id=?, dorm_id=? WHERE student_id=?";
        if (req.body.major_id == "NULL"){
            var major_id = null;
        }else {major_id = req.body.major_id}
        var inserts = [req.body.student_fname, req.body.student_lname, req.body.email, req.body.gpa, major_id, req.body.dorm_id, req.params.student_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a student, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:student_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Students WHERE student_id=?";
        var inserts = [req.params.student_id];
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
