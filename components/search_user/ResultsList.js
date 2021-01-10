import React from 'react';
import UserInviteListItem from './UserInviteListItem';

const ResultsList = ({results, groups}) => {

  const results_list = results.map((user) => {
    return <UserInviteListItem key={user._id} user={user} groups={groups}/>
  })

  return (
    <ul className='invite_list'>
      {results_list}
    </ul>
  )
}

export default ResultsList;
