import React from 'react';
import axios from 'axios';

import getUserIds from '../../lib/api/user/getUserIds';
import getUserById from '../../lib/api/user/getUserById';

const Page = (props) => {

  const {username, avatar, signature} = props.user;
  const topics = props.user.topics;


  return (
    <div>Test</div>
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
