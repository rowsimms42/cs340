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

    function getClass(res, mysql, context, class_id, complete){
        var sql = "SELECT class_id, class_name, department, class_capacity FROM Classes WHERE class_id = ?";
        var inserts = [class_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.class = results[0];
            complete();
        });
    }

    /*Display all classes. Requires web based javascript to delete users with AJAX*/

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

    /* Display one class for the specific purpose of updating classes */

    router.get('/:class_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateclass.js"];
        var mysql = req.app.get('mysql');
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-class', context);
            }

        }
    });

    /* Adds a class, redirects to the classes page after adding */

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

    /* The URI that update data is sent to in order to update a class */

    router.put('/:class_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Classes SET class_name=?, department=?, class_capacity=? WHERE class_id=?";
        var inserts = [req.body.class_name, req.body.department, req.body.class_capacity, req.params.class_id];
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
