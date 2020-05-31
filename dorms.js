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

    function getDorm(res, mysql, context, dorm_id, complete){
        var sql = "SELECT dorm_id, dorm_name, dorm_address, dorm_capacity FROM Dorms WHERE dorm_id = ?";
        var inserts = [dorm_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dorm = results[0];
            complete();
        });
    }

    /*Display all dorms. Requires web based javascript to delete users with AJAX*/

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

    /* Display one dorm for the specific purpose of updating dorms */

    router.get('/:dorm_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatedorm.js"];
        var mysql = req.app.get('mysql');
        getDorm(res, mysql, context, req.params.dorm_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-dorm', context);
            }

        }
    });

    /* Adds a dorm, redirects to the dorms page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Dorms (dorm_name, dorm_address, dorm_capacity) VALUES (?,?,?)";
        var inserts = [req.body.dorm_name, req.body.dorm_address, req.body.dorm_capacity];
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

    /* The URI that update data is sent to in order to update a dorm */

    router.put('/:dorm_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Dorms SET dorm_name=?, dorm_address=?, dorm_capacity=? WHERE dorm_id=?";
        var inserts = [req.body.dorm_name, req.body.dorm_address, req.body.dorm_capacity, req.params.dorm_id];
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