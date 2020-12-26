import React from 'react';

const GroupListDropDown = ({group}) => {

  return (
    <a className='link' href={'/groups/' + group._id}>
      <li>{group.name} - Users : {group.users.length}</li>
    </a>
  )
}

export default GroupListDropDown;
