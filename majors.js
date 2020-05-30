module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMajors(res, mysql, context, complete){
        mysql.pool.query("SELECT major_id, major_name, dept_chair, required_units FROM Majors", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.majors = results;
            complete();
        });
    }

    function getMajor(res, mysql, context, major_id, complete){
        var sql = "SELECT major_id, major_name, dept_chair, required_units FROM Majors WHERE major_id = ?";
        var inserts = [major_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.major = results[0];
            complete();
        });
    }

    /*Display all majors. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getMajors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('majors', context);
            }
        }
    });

    /* Display one major for the specific purpose of updating majors */

    router.get('/:major_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatemajor.js"];
        var mysql = req.app.get('mysql');
        getMajor(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-major', context);
            }

        }
    });

    /* Adds a major, redirects to the majors page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Majors (major_name, dept_chair, required_units) VALUES (?,?,?)";
        var inserts = [req.body.major_name, req.body.dept_chair, req.body.required_units];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/majors');
            }
        });
    });

    /* The URI that update data is sent to in order to update a major */

    router.put('/:major_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Majors SET major_name=?, dept_chair=?, required_units=? WHERE major_id=?";
        var inserts = [req.body.major_name, req.body.dept_chair, req.body.required_units, req.params.major_id];
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

    return router;
}();
