import React, { useState, useEffect } from 'react';
import '../Style/Thread.css';

function Thread() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [thread, setThread] = useState(null);

  useEffect(() => {
    fetch("/api/thread")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setThread(result[0].name);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )

    fetch("/api/comments")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setComments(result);
          console.log(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <section id="thread">
        <h1>{thread}</h1>
        <div className="comments">
          {comments.map(comment => (
            <div className="comment" key={comment.id}>
              <div className="comment-head">
                <p className="id">{comment.id}</p>
                <p className="name">null スタックエンジニアの民</p>
                <p className="date">{comment.post_date}</p>
              </div>
              <div className="contents">
                {comment.comment}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Thread;