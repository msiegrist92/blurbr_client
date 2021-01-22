import React from 'react';
import RemoveUserItem from '../../components/manage_group/RemoveUserItem';
import RemoveTopicItem from '../../components/manage_group/RemoveTopicItem';


const genUsers = (users, selections, setSelections) => {
  let copy =[...users];
  copy.shift();

  return copy.map((user) => {
    return <RemoveUserItem user={user} key={user._id}
      selections={selections} setSelections={setSelections} />
  })
}

const genTopics = (topics, selections, setSelections) => {
  return topics.map((topic) => {
    return <RemoveTopicItem topic={topic} key={topic._id}
      selections={selections} setSelections={setSelections} />
  })
}

module.exports = {
  genUsers,
  genTopics
}
