import React from 'react';
import axios from 'axios';

import getTopicIds from '../../lib/api/topics/getTopicIds';
import getTopicById from '../../lib/api/topics/getTopicById';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

import TopicBody from '../../components/topics/TopicBody';
import PostForm from '../../components/forms/PostForm';
import PostBody from '../../components/posts/PostBody';


const Page = ({topic_data}) => {

  const {topic} = topic_data;
  const {topic_author} = topic_data;

  const {posts, _id, title, body, author, date_created} = topic;
  const {username} = topic_author;

  const timestamp = formatDateFromDB(date_created);

  const topic_posts = topic.posts.map((topic) => {
    return (
      <PostBody
        key={topic._id}
        author={author}
        body={topic.body}
        date_created={topic.date_created}
      />
    )
  })

  return (
    <div>
      <TopicBody title={title} author={username}
        body={body} date_created={timestamp} />
      {topic_posts}
      <PostForm id={_id}/>
    </div>
  )
}

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
