import React, {useState} from 'react';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

const TopicListDropDown = ({topic}) => {

  return (
    <a className='link' href={'/topics/' + topic._id}>
      <li>{topic.title} - {formatDateFromDB(topic.date_created)}</li>
    </a>
  )
}

export default TopicListDropDown;
