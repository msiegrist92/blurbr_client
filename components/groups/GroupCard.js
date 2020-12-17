import React from 'react';

const GroupCard = ({name, group_id, owner, owner_id, topics, users, most_recent, most_recent_id}) => {

  const group_link = 'groups/' + group_id;
  const owner_link = 'users/' + owner_id;
  const most_recent_link = 'topics/' + most_recent_id;

  return (
    <>
    <div className='group_card'>
      <div className='group_card_content'>
        <h1 className='span_card'><a href={group_link}>{name}</a></h1>
        <h2 className='owner span_card'>Owner</h2>
        <h3 className='owner_label span_card'><a href={owner_link}>{owner}</a></h3>
        <h2 className='user_label'>Users</h2>
        <h3>{users}</h3>
        <h2 className='topics_label'>Topics</h2>
        <h3>{topics}</h3>
        <h2 className='recent_label span_card'>Most Recent</h2>
        <a className='span_card' href={most_recent_link}>{most_recent}</a>
      </div>
      <div className='btn_attach'>
        <button className='span_card span_btn'>Join Group</button>
      </div>
    </div>
  </>
  )
}

export default GroupCard;
