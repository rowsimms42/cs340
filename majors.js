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

    return router;
}();
