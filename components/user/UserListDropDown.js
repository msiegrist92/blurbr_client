import React, {useState} from 'react';

const UserListDropDown = ({user}) => {

  return (
    <>
    <a className='link' href={'/users/' + user._id}>
      <li>{user.username}<hr />Topics Created: {user.topics.length}</li>
    </a>
    </>
  )
}

export default UserListDropDown;
