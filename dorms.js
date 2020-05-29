module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getDorms(res, mysql, context, complete){
        mysql.pool.query("SELECT dorm_id, dorm_name, dorm_address, dorm_capacity FROM Dorms", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dorms = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getDorms(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('dorms', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Dorms (dorm_name, dorm_address, dorm_capacity) VALUES (?,?,?)";
        var inserts = [req.body.dorm_name, req.body.address, req.body.dorm_capacity];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/dorms');
            }
        });
    });

    return router;
}();