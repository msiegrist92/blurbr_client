import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';


import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';

// import formatDateFromDB from '../../lib/utils/formatDateFromDB';


import Header from '../../components/Header';
import Modal from '../../components/Modal';
import TopicsDropDown from '../../components/user/TopicsDropDown'
import GroupInfo from '../../components/groups/GroupInfo';

const Page = ({group_data}) => {

  const {name, owner, topics, users} = group_data;

  return (
    <>
      <Header />
      <GroupInfo
        name={name} owner={owner} num_topics={topics.length} num_users={users.length}
      />
    <TopicsDropDown topics={topics} />
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
