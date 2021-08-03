import React, { useState } from 'react';

const EditComment = (props) => {
  const [editComment, setEditComment] = useState(props.editCommentComment);

  // コメント内容セット
  const changeComment = (e) => {
    setEditComment(() => e.target.value)
  }

  // 投稿
  const postComment = () => {
    const method = "POST";
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify({id: props.editCommentId, comment: editComment});

    fetch('/api/edit-comment', {method, headers, body})
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        props.changeRefresh();
        props.changeEditCommentFlag();
      },
      (error) => {
        console.log(error)
      }
    )
  }

  if (props.editCommentId != null && props.editCommentComment != null) {
    return (
      <div>
        <div className="edit-comment">
          <div className="edit-field-bg" onClick={props.changeEditCommentFlag}></div>
          <section className="edit-field">
            <div className="edit-field-head">
              <p className="title">✍🏻 コメント編集</p>
              <button className="close-button" onClick={props.changeEditCommentFlag}>&#x2716;</button>
            </div>
            <div className="edit-field-contents">
              <textarea value={editComment} onChange={changeComment} />
              <input type="hidden" value={props.editCommentId} />
              <button className="submit" onClick={postComment}>編集</button>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default EditComment;