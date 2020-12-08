import React from 'react';
import Link from 'next/link';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

const PostBody = ({author, body, date_created, signature, avatar, author_link}) => {

  return (
    <div className='thread post_thread container'>
      <a className='link' href={author_link}>
        <h2>{author}</h2>
      </a>
      <p className='post_body'>{body}</p>
      <h4>{date_created}</h4>
      <p className='signature'>{signature}</p>
      <img className='avatar_img thread_avatar' src={process.env.NEXT_PUBLIC_AVATAR_DIR + avatar}></img>
    </div>
  )
}

export default PostBody;
