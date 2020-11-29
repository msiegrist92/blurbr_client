import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ListTopic from '../components/topics/ListTopic.js';

const Topics = ({topics}) => {

  const topic_list = topics.map((topic) => {
    return (
      <ListTopic
        key={topic._id}
        title={topic.title}
        body={topic.body}
        author={topic.author.username}
        date={topic.date_created}
        link={'/topics/' + topic._id}
      />
    )
  })

  return (
    <div>
      <ul>{topic_list}</ul>
    </div>
  )
}

export async function getServerSideProps(){

  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/topic').then((res) => {
    return {
      props : {
        topics: res.data
      }
    }
  }).catch((err) => {
    console.log(err);
  })

}

export default Topics;
