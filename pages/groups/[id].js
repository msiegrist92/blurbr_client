import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';


import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import CaretTurnDropDown from '../../components/CaretTurnDropDown';
import TopicListDropDown from '../../components/topics/TopicListDropDown';
import GroupInfo from '../../components/groups/GroupInfo';
import UserListDropDown from '../../components/user/UserListDropDown';

const Page = ({group_data}) => {

  const {name, owner, topics, users} = group_data;

  const topics_list = topics.map((topic) => {
    return <TopicListDropDown key={topic._id} topic={topic} />
  })

  const user_list = users.map((user) => {
    return <UserListDropDown key={user._id} user={user} />
  })

  return (
    <>
      <Header />
      <GroupInfo
        name={name} owner={owner} num_topics={topics.length} num_users={users.length}
      />
    <div className='container drops_cont'>
    <CaretTurnDropDown list={topics_list} class_name={'topics_list'}
      list_name={'Topics'} h1_class={'topics'}
    />
    <CaretTurnDropDown list={user_list} class_name={'user_list'}
      list_name={'Users'} h1_class={'users'}
    />
  </div>
    </>
  )
}


export async function getStaticProps({params}){
  return {
     props : {
       group_data : await getDocById(process.env.NEXT_PUBLIC_DEV_API + '/group/', params.id).then((res) => {
         console.log(res)
         return res;
       })
     }
   }
}

export async function getStaticPaths(){
  return {
    paths: await getIds(process.env.NEXT_PUBLIC_DEV_API + '/groups', '_id').then((res) => {
      return res;
    }),
    fallback: false
  }
}

export default Page;
