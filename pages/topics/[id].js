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
  const topic_author = topic.user;

  const {posts, _id, title, body, author, date_created} = topic;

  const posts_list = topic.posts.map((post) => {
    return (
      <PostBody
        key={post._id}
        author={post.user.username}
        body={post.body}
        date_created={formatDateFromDB(post.date_created)}
      />
    )
  })

  return (
    <div>
      <TopicBody title={title} author={topic_author.username}
        body={body} date_created={formatDateFromDB(date_created)} />
      {posts_list}
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
