import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';
//
// import getTopicIds from '../../lib/api/topics/getTopicIds';
// import getTopicById from '../../lib/api/topics/getTopicById';
// import formatDateFromDB from '../../lib/utils/formatDateFromDB';

import TopicBody from '../../components/topics/TopicBody';
import PostForm from '../../components/forms/PostForm';
import PostBody from '../../components/posts/PostBody';
import Header from '../../components/Header';
import Modal from '../../components/Modal';








export async function getStaticProps({params}){

  return {
     props : {
       topic_data : await getTopicById(params.id).then((res) => {
         return res;
       })
     }
   }
}

export async function getStaticPaths(){
  return {
    paths: await getTopicIds().then((res) => {
      return res;
    }),
    fallback: false
  }
}

export default Page;
