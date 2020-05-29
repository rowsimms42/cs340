var express = require('express');
var app = express();
var mysql = require('./dbcon.js');
app.set('mysql', mysql);
var handlebars = require('express-handlebars').create({defaultLayout:'main',});
app.engine('handlebars', handlebars.engine);
app.set("view engine", 'handlebars');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.argv[2]);

app.use('/static', express.static('public'));
app.use('/', express.static('public'));

app.use('/students', require('./students.js'));
app.use('/majors', require('./majors.js'));
app.use('/classes', require('./classes.js'));
app.use('/dorms', require('.dorms.js'));

app.get('/', function(req, res){
	res.render("home");
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
  console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
