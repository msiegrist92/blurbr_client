import React from 'react';
import TopicListDropDown from '../../components/topics/TopicListDropDown';
import GroupListDropDown from '../../components/groups/GroupListDropDown';
import UserListDropDown from '../../components/user/UserListDropDown';

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

const genList = (array, type) => {

  if(array.length === 0){
    return [];
  }

  if(type === 'topic'){
    return array.map((item) => {
      return <TopicListDropDown key={item._id} topic={item} />
    })
  }

  if(type === 'user'){
    return array.map((item) => {
      return <UserListDropDown key={item._id} user={item} />
    })
  }
}

export {
  genListIfUser,
  genList
}
