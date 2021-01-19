import React, {useState} from 'react';
import axios from 'axios';

import RemoveUserItem from './RemoveUserItem';

const RemoveUsers = ({group_data}) => {

  const [selections, setSelections] = useState([]);

  const removeUsers = (e, selections) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/groupmgmt/removeusers', {
      user_token: sessionStorage.token,
      group_id : group_data._id,
      selections
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
  }

  //owner is always first member added to group
  let copy = [...group_data.users];
  copy.shift();

  const remove_list = copy.map((user) => {
    return <RemoveUserItem user={user} key={user._id}
      selections={selections} setSelections={setSelections}
      />
  })

  return (
    <>
    <form
      style={{gap: '0'}}
      className='purple_form center_cont two_col_70_30'
      onSubmit={(e) => {removeUsers(e, selections)}}
      >
      <h2 className='self_center'>User Name</h2>
      <h2 style={{marginTop: '0'}}className='center_cont self_center'>Remove</h2>
      <ul className='span_two_col'>
        {remove_list}
      </ul>
      <input value="Remove" className='center_cont span_two_col' type='submit' />
    </form>
    </>
  )
}

export default RemoveUsers;
