require('dotenv').config();
const env = process.env

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.get('/', function(req, res, next) {
  const connection = mysql.createConnection({
    host: 'mysql',
    database: env.MYSQL_DATABASE,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
  
  connection.query('select name from ThreadList where id=1', (err, rows, fields) => {
    if (err) throw err;

    var param = {rows};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  });
  
  connection.end();
});

router.get('/hello', function(req, res, next) {
  var param = {"result":"Hello World !"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

module.exports = router;