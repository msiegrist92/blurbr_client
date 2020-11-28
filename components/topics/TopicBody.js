import React from 'react';

const TopicBody = ({title, author, body, date_created}) => {

  //TopicBody has full length body and full-page threaded styling

  return (
    <div>
      <h1>Hello</h1>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <p>{body}</p>
      <h4>{date_created}</h4>
    </div>
  )
}

export default TopicBody;
