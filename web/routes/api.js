require('dotenv').config();
const env = process.env

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.get('/thread', function (req, res, next) {
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
    res.json(rows);
  });

  connection.end();
});

router.get('/comments', function (req, res, next) {
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

  connection.query('select * from CommentList where thread_id=1', (err, rows, fields) => {
    res.json(rows);
  });

  connection.end();
});

router.get('/hello', function (req, res, next) {
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "masalib"
  }]);
});

module.exports = router;