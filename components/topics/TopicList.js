import React from 'react';
import Link from 'next/link';

const TopicList = ({title, body, author, date, topic_link, length, author_link}) => {

  //ListTopic has truncated body and container-card styling
  const replies = "Replies: " + length;

  //truncate body to x chars ... if length > y

  return (
    <div className='topic_list'>
      <a href={topic_link}>
        <h1>{title}<i className='chevron right icon'></i></h1>
      </a>
      <a href={author_link}>
        <h3>By : {author}</h3>
      </a>
      <h4 className='date'>{date}</h4>
      <p>{body}</p>
      <h4 className='replies'>{replies}</h4>
    </div>
  )
}

export default TopicList;
