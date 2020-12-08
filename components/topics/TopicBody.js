import React from 'react';
import Link from 'next/link';

const TopicBody = ({title, author, body, date_created, signature, avatar, author_link}) => {

  //TopicBody has full length body and full-page threaded styling

  return (
    <div className='topic_thread container'>
      <h1>{title}</h1>
      <p className='post_body'>{body}</p>
      <a href={author_link}>
        <h2>{author}</h2>
      </a>
      <h4>{date_created}</h4>
      <p className='sig_text'>{signature}</p>
      <img className='thread_avatar' src={process.env.NEXT_PUBLIC_AVATAR_DIR + avatar}></img>
    </div>
  )
}

export default TopicBody;
