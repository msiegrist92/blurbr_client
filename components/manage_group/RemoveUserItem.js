import React from 'react';

const RemoveUserItem = ({user}) => {

  return (
    <>
      <li className='two_col_70_30'>
        <h3>{user.username}</h3>
        <input type='checkbox' name='remove' value={user._id}></input>
      </li>
    </>
  )
}

export default RemoveUserItem;
