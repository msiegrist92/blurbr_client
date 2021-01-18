import React from 'react';
import TopicListDropDown from '../../components/topics/TopicListDropDown';
import GroupListDropDown from '../../components/groups/GroupListDropDown';

const genListIfUser = (user, type) => {
  if(!user){
    return [];
  }
  if(user && type === 'group'){
    return user.groups.map((group) => {
      return <GroupListDropDown key={group._id} group={group} />
    })
  }
  if(user && type === 'topic'){
    return user.topics.map((topic) => {
      return <TopicListDropDown key={topic._id} topic={topic} />
    })
  }
}

export default genListIfUser;
