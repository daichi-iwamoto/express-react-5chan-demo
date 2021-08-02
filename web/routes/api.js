require('dotenv').config();
const env = process.env

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/*
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
*/

router.get('/thread', function (req, res, next) {
  connection.query('select name from ThreadList where id=1', (err, rows, fields) => {
    res.json(rows);
  });
});


router.get('/comments', function (req, res, next) {
  connection.query('select * from CommentList where thread_id=1', (err, rows, fields) => {
    res.json(rows);
  });
});

router.get('/thread-demo', function (req, res, next) {
  res.json([
    {
      id: 1,
      name: "test thread name"
    }
  ]);
});


router.get('/comments-demo', function (req, res, next) {
  res.json([
    {
      id: 1,
      thread_id: 1,
      comment: "test comment 01",
      post_date: '2021-08-01 00:00:01.000001',
      edited: false
    },
    {
      id: 2,
      thread_id: 1,
      comment: "test comment 02",
      post_date: '2021-08-01 00:00:01.000001',
      edited: false
    },
    {
      id: 3,
      thread_id: 1,
      comment: "test comment 03",
      post_date: '2021-08-01 00:00:01.000001',
      edited: true
    },
    {
      id: 4,
      thread_id: 1,
      comment: "日本語",
      post_date: '2021-08-01 00:00:01.000001',
      edited: true
    },
  ]);
});

router.get('/add-comments', function (req, res, next) {
  const sql = "insert into CommentList (thread_id, comment, post_date, edited) values (1, 'にほんご', '2021-08-01 00:00:01.000001', false)"

  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
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