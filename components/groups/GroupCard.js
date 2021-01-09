import React, {useState} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken'

const GroupCard = ({name, group_id, owner, owner_id, topics, users, most_recent, user, owns}) => {

  let manage_link = '/managegroups/'

  if(owns){
    manage_link += `${group_id}`
  }

  const group_link = 'groups/' + group_id;
  const owner_link = 'users/' + owner_id;
  let most_recent_link;
  let most_recent_title;

  if(most_recent != null){
    most_recent_link = 'topics/' + most_recent._id;
    most_recent_title = most_recent.title;
  } else {
    most_recent_link = '/groups';
    most_recent_title = 'N/A';
  }

  if(name.length > 23){
    name = name.slice(0, 23) + '...'
  }

  const formatRequestToken = (user_id, group_id) => {
    const req_token = jwt.sign({user_id, group_id}, process.env.NEXT_PUBLIC_JWT_SECRET);
    return req_token;
  }

  const requestToJoin = e => {
    e.preventDefault();

    const user_id = jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;

    const join_req_token = formatRequestToken(user_id, group_id);

    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/group/joinrequest/' + join_req_token)
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <li className='group_card'>
      <div className='group_card_content'>
        <h1 className='span_card'><a href={group_link}>{name}</a></h1>
        <h2 className='owner span_card'>Owner</h2>
        <h3 className='owner_label span_card'><a href={owner_link}>{owner}</a></h3>
        <h2 className='user_label'>Users</h2>
        <h3>{users}</h3>
        <h2 className='topics_label'>Topics</h2>
        <h3>{topics}</h3>
        <h2 className='recent_label span_card'>Most Recent</h2>
        <a className='span_card' href={most_recent_link}>{most_recent_title}</a>
      </div>
      <div className='btn_attach'>
        {!owns &&
          <button onClick={(e) => requestToJoin(e)}className='span_card span_btn'>Join Group</button>
        }
        {owns &&
          <button className='span_card span_btn'><a href={manage_link}>ass</a></button>
        }
      </div>
    </li>
  </>
  )
}

export default GroupCard;
