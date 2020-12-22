import React from 'react';
import axios from 'axios';

import UserInfo from '../../components/user/UserInfo';
import Header from '../../components/Header';
import TopicsDropDown from '../../components/user/TopicsDropDown';

import {getIds, getDocById} from '../../lib/api/dynamicRouting';

const Page = (props) => {

  const {username, avatar, signature, number_posts} = props.user;
  const topics = props.user.topics;


  return (
    <div>
      <Header />
      <UserInfo
        username={username} avatar={avatar} signature={signature}
        number_posts={number_posts} topics={topics}
      />
    <TopicsDropDown topics={topics} />
    </div>
  )
}


export async function getStaticProps({params}){
  console.log(params.id)
  return {
    props : {
      user: await getDocById(process.env.NEXT_PUBLIC_DEV_API + '/user/', params.id).then((res) => {
        return res
      })
    }
  }
}

export async function getStaticPaths(){
  return {
    paths: await getIds(process.env.NEXT_PUBLIC_DEV_API + '/users', '_id').then((res) => {
      return res
    }),
    fallback: false
  }
}

export default Page;
