import React, {useState} from 'react';
import Link from 'next/link';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

const TopicListUser = ({topic}) => {

  return (
    <a className='link' href={'/topics/' + topic._id}>
      <li>{topic.title} - {formatDateFromDB(topic.date_created)}</li>
    </a>
  )
}

export default TopicListUser;
