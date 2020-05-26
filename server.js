var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4242);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('mysql', mysql);
app.use(express.static("public"));

app.use('/students', require('./students.js'));
//app.use('/majors', require('./majors.js'));
//app.use('/classes', require('./classes.js'));
//app.use('/dorms', require('./dorms.js'));
//app.use('/registration', require('./registration.js'));*
app.get('/', function(req, res){
    res.render('index');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
