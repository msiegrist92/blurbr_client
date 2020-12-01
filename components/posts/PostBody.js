import React from 'react';
import Link from 'next/link';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

const PostBody = ({author, body, date_created, signature, avatar, author_link}) => {

  return (
    <div>
      <a className='link' href={author_link}>
        <h2>{author}</h2>
      </a>
      <p>{body}</p>
      <h4>{date_created}</h4>
      <p>{signature}</p>
      <img src={process.env.NEXT_PUBLIC_AVATAR_DIR + avatar}></img>
    </div>
  )
}

export default PostBody;
