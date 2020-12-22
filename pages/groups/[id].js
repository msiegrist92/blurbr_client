import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';

import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';
//
// import getTopicIds from '../../lib/api/topics/getTopicIds';
// import getTopicById from '../../lib/api/topics/getTopicById';
// import formatDateFromDB from '../../lib/utils/formatDateFromDB';


import Header from '../../components/Header';
import Modal from '../../components/Modal';

const Page = ({group_data}) => {

  console.log(group_data)

  return (
    <div>Hey u champ</div>
  )
}








export async function getStaticProps({params}){
  return {
     props : {
       group_data : await getDocById(process.env.NEXT_PUBLIC_DEV_API + '/group/', params.id).then((res) => {
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
