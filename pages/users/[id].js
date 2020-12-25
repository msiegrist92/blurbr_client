import React from 'react';
import axios from 'axios';

import UserInfo from '../../components/user/UserInfo';
import Header from '../../components/Header';
import TopicListDropDown from '../../components/topics/TopicListDropDown';
import CaretTurnDropDown from '../../components/CaretTurnDropDown';

import {getIds, getDocById} from '../../lib/api/dynamicRouting';

const Page = (props) => {


  const {username, avatar, signature, number_posts} = props.user;
  const topics = props.user.topics;

  const topics_list = topics.map((topic) => {
    return <TopicListDropDown key={topic._id} topic={topic} />
  })


  return (
    <div>
      <Header />
      <UserInfo
        username={username} avatar={avatar} signature={signature}
        number_posts={number_posts} topics={topics}
      />
      <CaretTurnDropDown list={topics_list} class_name={'topics_list'}
        list_name={'Topics'} h1_class={'topics'}
      />
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
