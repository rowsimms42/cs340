module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getClasses(res, mysql, context, complete){
        mysql.pool.query("SELECT class_id, class_name, department, class_capacity FROM Classes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('classes', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Classes (class_name, department, class_capacity) VALUES (?,?,?)";
        var inserts = [req.body.class_name, req.body.department, req.body.class_capacity];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/classes');
            }
        });
    });

    return router;
}();
