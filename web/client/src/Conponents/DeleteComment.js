import React, { useState } from 'react';
import '../Style/DeleteComment.css';

const DeleteComment = (props) => {
  /** コメント削除処理 */
  const delComment = () => {
    const method = "POST";
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify({id: props.delCommentId});

    fetch('/api/delete-comment', {method, headers, body})
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        props.changeRefresh();
        props.changeDeleteCommentFlag();
      },
      (error) => {
        console.log(error)
      }
    )
  }

  /** DeleteComment return */
  return (
    <div className="delete-comment">
      <div className="delete-field-bg" onClick={props.changeDeleteCommentFlag}></div>
      <div className="delete-field">
        <div className="delete-field-head">
          <p>このコメントを削除しますか？</p>
        </div>
        <div className="delete-field-contents">
          <button className="yes" onClick={delComment}>はい</button>
          <button className="no" onClick={props.changeDeleteCommentFlag}>いいえ</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteComment;