import React from 'react';
import Link from 'next/link';

const TopicList = ({title, body, author, date, topic_link, length, author_link}) => {

  //ListTopic has truncated body and container-card styling
  const replies = "Replies: " + length;

  return (
    <div>
      <Link href={topic_link}>
        <h1>{title}</h1>
      </Link>
      <h4>{replies}</h4>
      <p>{body}</p>
      <Link href={author_link}>
        <h2>{author}</h2>
      </Link>
      <h2>{date}</h2>
    </div>
  )
}

export default TopicList;
