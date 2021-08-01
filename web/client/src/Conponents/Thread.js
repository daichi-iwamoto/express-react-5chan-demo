import React, { useState, useEffect } from 'react';

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
      <div>
        <h1>{thread}</h1>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              {comment.comment}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Thread;