require('dotenv').config();
const env = process.env

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/** DB接続 */
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

/** スレタイ取得 */
router.get('/thread', function (req, res) {
  connection.query('select name from ThreadList where id=1', (err, rows, fields) => {
    res.json(rows);
  });
});

/** コメント一覧取得 */
router.get('/comments', function (req, res) {
  connection.query('select * from CommentList where thread_id=1 order by id', (err, rows, fields) => {
    res.json(rows);
  });
});

/** コメント削除 */
router.post('/delete-comment', function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  connection.query(`delete from CommentList where id=${req.body.id}`, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

/** コメント編集 */
router.post('/edit-comment', function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  connection.query(`update CommentList set comment="${req.body.comment}", edited=true where id=${req.body.id}`, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

/** コメント追加 */
router.post('/add-comment', function (req, res) {
  console.log(req.body.post_comment);
  console.log(req.body.post_date);
  connection.query(`insert into CommentList (thread_id, comment, post_date, edited) values (1, "${req.body.post_comment}", "${req.body.post_date}", false)`, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;