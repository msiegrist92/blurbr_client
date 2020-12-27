import React from 'react';
import UserInviteListItem from './UserInviteListItem';

const ResultsList = ({results}) => {

  const results_list = results.map((user) => {
    return <UserInviteListItem user={user} />
  })

  return (
    <ul>
      {results_list}
    </ul>
  )
}

export default ResultsList;
