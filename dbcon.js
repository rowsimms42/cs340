var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_simmonli',
  password        : '6398',
  database        : 'cs340_simmonli'
});

module.exports.pool = pool;
