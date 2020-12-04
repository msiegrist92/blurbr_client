import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';

import Header from '../components/Header';
import TopicList from '../components/topics/TopicList.js';
import TopicForm from '../components/forms/TopicForm';

import formatDateFromDB from '../lib/utils/formatDateFromDB';

const Topics = ({topics}) => {

  console.log(topics);

  const topic_list = topics.map((topic) => {
    return (
      <TopicList
        key={topic._id}
        title={topic.title}
        body={topic.body}
        author={topic.author.username}
        author_link={'/users/' + topic.author._id}
        date={formatDateFromDB(topic.date_created)}
        topic_link={'/topics/' + topic._id}
        length={topic.length}
      />
    )
  })

  return (
    <div>
      <Head>
          <title>Blurbr Topics</title>
      </Head>
      <Header />
      <h1 class='center_text'>Create a new post</h1>
      <TopicForm />
      <ul className='container'>{topic_list}</ul>
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
