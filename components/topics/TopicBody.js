import React from 'react';
import Link from 'next/link';

const TopicBody = ({title, author, body, date_created, signature, avatar, author_link}) => {

  //TopicBody has full length body and full-page threaded styling

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <Link href={author_link}>
        <h2>{author}</h2>
      </Link>
      <h4>{date_created}</h4>
      <p>{signature}</p>
      <img src={process.env.NEXT_PUBLIC_AVATAR_DIR + avatar}></img>
    </div>
  )
}

export default TopicBody;
