import React from 'react';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

const PostBody = (props) => {

  const timestamp = props.date_created;

  return (
    <div>
      <h2>{props.author}</h2>
      <p>{props.body}</p>
      <h2>{timestamp}</h2>
    </div>
  )
}

export default PostBody;
