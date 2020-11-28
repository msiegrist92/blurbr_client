import React from 'react';

const ListTopic = ({title, body, author, date}) => {

  //ListTopic has truncated body and container-card styling

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <h2>{author}</h2>
      <h2>{date}</h2>
    </div>
  )
}

export default ListTopic;
