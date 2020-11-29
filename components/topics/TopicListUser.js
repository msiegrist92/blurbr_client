import React from 'react';
import Link from 'next/link';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

const TopicListUser = ({topic}) => {

  console.log(topic);

  return (
    <Link href={'/topics/' + topic._id}>
      <li>{topic.title} - {formatDateFromDB(topic.date_created)}</li>
    </Link>
  )
}

export default TopicListUser;
