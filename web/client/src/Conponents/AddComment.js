import React, { useState } from 'react';

const AddComment = (props) => {
  const [addFlag, setAddFlag] = useState(false);
  const [comment, setComment] = useState('');

  // ポップアップ表示切替
  const setFieldFlag = () => {
    setAddFlag(!addFlag);
  }

  // コメントセット
  const changeComment = (e) => {
    setComment(() => e.target.value)
  }

  // 投稿
  const postComment = () => {
    const date = new Date();
    const now_date = `${date.getFullYear()}-${("00" + (date.getMonth() + 1)).slice(-2)}-${("00" + date.getDate()).slice(-2)} ${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}:${date.getSeconds()}.${date.getMilliseconds()}`;

    const method = "POST";
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify({post_comment: comment, post_date: now_date});

    fetch('/api/add-comment', {method, headers, body})
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        props.changeRefresh();
        setFieldFlag();
      },
      (error) => {
        console.log(error)
      }
    )
  }

  if (!addFlag) {
    return (
      <div className="add-comment">
        <button className="add-button" onClick={setFieldFlag}>&#x1f5e8; コメント追加</button>
      </div>
    )
  } else {
    return (
      <div className="edit-comment">
        <div className="edit-field-bg" onClick={setFieldFlag}></div>
        <section className="edit-field">
          <div className="edit-field-head">
            <p className="title">&#x1f5e8; コメント追加</p>
            <button className="close-button" onClick={setFieldFlag}>&#x2716;</button>
          </div>
          <div className="edit-field-contents">
            <textarea value={comment} onChange={changeComment} />
            <button className="submit" onClick={postComment}>投稿</button>
          </div>
        </section>
      </div>
    )
  }
}

export default AddComment;