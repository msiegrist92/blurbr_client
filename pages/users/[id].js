import React from 'react';
import axios from 'axios';

import UserInfo from '../../components/user/UserInfo';

import getUserIds from '../../lib/api/user/getUserIds';
import getUserById from '../../lib/api/user/getUserById';

const Page = (props) => {

  const {username, avatar, signature, number_posts} = props.user;
  const topics = props.user.topics;


  return (
    <div>
      <UserInfo
        username={username} avatar={avatar} signature={signature}
        number_posts={number_posts} topics={topics}
      />
    </div>
  )
}


export async function getStaticProps({params}){

  return {
    props : {
      user: await getUserById(params.id).then((res) => {
        console.log('res.data', res.data);
        return res.data
      })
    }
  }
}

export async function getStaticPaths(){
  return {
    paths: await getUserIds().then((res) => {
      return res.data
    }),
    fallback: false
  }
}

export default Page;
