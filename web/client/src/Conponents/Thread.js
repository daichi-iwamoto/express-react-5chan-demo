import React, { useState, useEffect } from 'react';
import '../Style/Thread.css';
import '../Style/EditComment.css';
import AddComment from './AddComment';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';

function Thread() {
  const [getTitleError, setGetTitleError] = useState(null);                      // title取得時エラー
  const [isTitleLoaded, setIsTitleLoaded] = useState(false);                     // title取得ローディング
  const [title, setTitle] = useState(null);                                      // titleデータ

  const [getCommentsError, setGetCommentsError] = useState(null);                // comments取得時エラー
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);               // comment取得ローディング
  const [comments, setComments] = useState([]);                                  // commentデータ

  const [editCommentFlag, setEditCommentFlag] = useState(false);                 // 編集コメント表示切替
  const [editCommentId, setEditCommentId] = useState(null);                      // 編集コメントID
  const [editCommentComment, setEditCommentComment] = useState(null);            // 編集コメント内容

  const [delCommentFlag, setDelCommentFlag] = useState(false);                   // 削除コメント表示切替
  const [delCommentId, setDelCommentId] = useState(null);                        // 削除コメントID

  /**
   * データ取得
   */
  useEffect(() => {
    fetch("/api/thread-demo")
    .then(res => res.json())
    .then(
      (result) => {
        setIsTitleLoaded(true);
        setTitle(result[0].name);
      },
      (error) => {
        setIsTitleLoaded(true);
        setGetTitleError(error);
      }
    )

    fetch("/api/comments-demo")
      .then(res => res.json())
      .then(
        (result) => {
          setIsCommentsLoaded(true);
          setComments(result);
        },
        (error) => {
          setIsCommentsLoaded(true);
          setGetCommentsError(error);
        }
      )
  }, [])

  /**
   * コメント編集
   */
  const editComment = (id, comment) => {
    setEditCommentId(id);
    setEditCommentComment(comment);
    setEditCommentFlag(true);
  }

  /**
   * コメント削除
   */
  const delComment = (id) => {
    setDelCommentId(id);
    setDelCommentFlag(true);
  }

  /**
   * タイトル表示切替
   * データ取得前・エラー時・取得後
   */
  const getTitle = () => {
    if (!isTitleLoaded) {
      return <h1>Loading...</h1>;
    } else if (getTitleError) {
      return <h1>Get Title Error: {getTitleError.message}</h1>;
    } else {
      return <h1>{title}</h1>;
    }
  }

  /**
   * ポップアップ用フラグ切替
   */
  const changeEditCommentFlag = () => {
    setEditCommentFlag(!editCommentFlag);
  }
  const changeDeleteCommentFlag = () => {
    setDelCommentFlag(!delCommentFlag);
  }

  /**
   * コメント表示切替
   * データ取得前・エラー時・取得後
   */
  const getComments = () => {
    if (!isCommentsLoaded) {
      return (
        <div className="comments">
          <div className="comment">
            <div className="contents">Loading...</div>
          </div>
        </div>
      );
    } else if (getCommentsError) {
      return (
        <div className="comments">
          <div className="comment">
            <div className="contents">Get Comments Error: {getCommentsError.message}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="comments">
          {comments.map(comment => (
            <div className="comment" key={comment.id}>
              <div className="comment-head">
                <p className="id">{comment.id}</p>
                <p className="name">nullスタックエンジニアの民</p>
                <p className="date">{comment.post_date}</p>
                <button className="edit" onClick={() => editComment(comment.id, comment.comment , () => console.log('success!'))}>編集</button>
                <button className="del" onClick={() => delComment(comment.id)}>削除</button>
                {comment.edited && <p className="edited">&#x270d;</p>}
              </div>
              <div className="contents">
                {comment.comment}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  /**
   * Thread return
   */
  return (
    <section id="thread">
      {getTitle()}
      {getComments()}
      {editCommentFlag && <EditComment editCommentId={editCommentId} editCommentComment={editCommentComment} changeEditCommentFlag={changeEditCommentFlag} />}
      {delCommentFlag && <DeleteComment delCommentId={delCommentId} changeDeleteCommentFlag={changeDeleteCommentFlag}  />}
      <AddComment />
    </section>
  );
}

export default Thread;