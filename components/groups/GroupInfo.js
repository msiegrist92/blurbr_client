import React, {useState} from 'react';

const GroupInfo = ({name, owner, num_topics, num_users, description}) => {

  const owner_link = '/users/' + owner._id;

  return (
    <div className='container group_info color_container'>
      <h1>{name}</h1>
      <h2>Owner <a href={owner_link}>{owner.username}</a></h2>
      <h3 className='center_text'>{description}</h3>
    </div>
  )
}

export default GroupInfo;
