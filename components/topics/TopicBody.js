import React from 'react';

const TopicBody = ({title, author, body, date_created}) => {

  //TopicBody has full length body and full-page threaded styling

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <h2>{author}</h2>
      <h4>{date_created}</h4>
    </div>
  )
}

export default TopicBody;
