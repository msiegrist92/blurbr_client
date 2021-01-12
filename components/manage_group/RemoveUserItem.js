import React from 'react';

const RemoveUserItem = ({user, selections, setSelections}) => {

  const user_link = `/users/${user._id}`;

  const toggleSelection = (e, selections) => {
    let copy = [...selections];
    if(copy.includes(e.target.value)){
      copy = copy.filter((item) => {
        return item !== e.target.value
      })
    } else {
      copy = [...copy, e.target.value]
    }
    setSelections(copy);
  }

  return (
    <>
      <li className='two_col_70_30'>
        <h3 className='self_center'><a href={user_link}>{user.username}</a></h3>
        <input
          onChange={(e) => {toggleSelection(e, selections)}}
          className='self_center' type='checkbox' name='remove' value={user._id}></input>
      </li>
    </>
  )
}

export default RemoveUserItem;
