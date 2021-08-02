import React, { useState } from 'react';
import '../Style/DeleteComment.css';

const DeleteComment = (props) => {
  // コメント削除
  const delComment = () => {
    console.log(props.delCommentId)
  }

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