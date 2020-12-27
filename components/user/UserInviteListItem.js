import React from 'react';

const UserInviteListItem = ({user}) => {

  return (
    <>
    <li>
      <h2>{user.username}</h2>
      <h2>{user.email}</h2>
      <h3>Posts - {user.posts}</h3>
      <h3>Groups - {user.groups.length}</h3>
      <button className='big_button call_to'>Invite User</button>
    </li>
    </>
  )
}

export default UserInviteListItem;
