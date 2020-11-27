import React from 'react';
import axios from 'axios';
import getTopicIds from '../../lib/api/topics/getTopicIds';
import getTopicById from '../../lib/api/topics/getTopicById';

const Page = () => {

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export async function getStaticProps({params}){
  console.log(params);
  getTopicById(params.id).then((res) => {
    console.log(res);
  })
}

export async function getStaticPaths(){
  return {
    paths: await getTopicIds().then((res) => {
      console.log(res)
      return res;
    }),
    fallback: false
  }
}

export default Page;
