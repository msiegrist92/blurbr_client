import React from 'react';
import Link from 'next/link';

const TopicList = ({title, body, author, date, link, length}) => {

  //ListTopic has truncated body and container-card styling

  return (
    <div>
      <Link href={link}>
        <h1>{title}</h1>
      </Link>
      <h4>Replies: {length}</h4>
      <p>{body}</p>
      <h2>{author}</h2>
      <h2>{date}</h2>
    </div>
  )
}

export default TopicList;
