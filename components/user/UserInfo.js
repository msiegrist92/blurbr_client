import React, {useState, useEffect} from 'react';

const UserInfo = ({username, avatar, signature, number_posts, topics}) => {

  avatar = process.env.NEXT_PUBLIC_AVATAR_DIR + avatar;


  number_posts = 'Posts: ' + number_posts;



  return (
    <div className='user_info container color_container'>
      <h1 className='username'>{username}</h1>
      <img src={avatar}></img>
      <p>{signature}</p>
      <h4 className='number_posts'>{number_posts}</h4>
    </div>
  )
}

export default UserInfo;
