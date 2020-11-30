import React from 'react';
import Link from 'next/link';

const TopicList = ({title, body, author, date, topic_link, length, author_link}) => {

  //ListTopic has truncated body and container-card styling
  const replies = "Replies: " + length;

  //truncate body to x chars ... if length > y

  return (
    <div className='topic_list'>
      <Link href={topic_link}>
        <h1>{title}</h1>
      </Link>
      <Link href={author_link}>
        <h3>By : {author}</h3>
      </Link>
      <h4>{date}</h4>
      <p>{body}</p>
      <h4>{replies}</h4>
    </div>
  )
}

export default TopicList;
