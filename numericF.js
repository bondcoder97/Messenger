var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'andrey',
  host: "localhost",
  user: "root",
  password: "vika9",
  insecureAuth : true
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});