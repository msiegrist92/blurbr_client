import React from 'react';

import RemoveUserItem from './RemoveUserItem';

const RemoveUsers = ({group_data}) => {

  const {users} = group_data;

  console.log(users)

  const remove_list = users.map((user) => {
    return <RemoveUserItem user={user} key={user._id}/>
  })

  return (
    <>
    <form className='purple_form center_cont two_col_70_30'>
      <h3>User Name</h3>
      <h3>Remove</h3>
      <ul className='span_two_col'>
        {remove_list}
      </ul>
      <input value="Remove" className='center_cont' type='submit' />
    </form>
    </>
  )
}

export default RemoveUsers;
