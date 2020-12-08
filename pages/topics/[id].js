import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';

import getTopicIds from '../../lib/api/topics/getTopicIds';
import getTopicById from '../../lib/api/topics/getTopicById';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';

import TopicBody from '../../components/topics/TopicBody';
import PostForm from '../../components/forms/PostForm';
import PostBody from '../../components/posts/PostBody';
import Header from '../../components/Header';
import Modal from '../../components/Modal';


const Page = ({topic_data}) => {

  const [modal, setModal] = useState(false);

  const toggleModal = (e, modal) => {
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }

  const {topic} = topic_data;
  const topic_author = topic.user;

  const {posts, _id, title, body, author, date_created} = topic;

  const posts_list = topic.posts.map((post) => {
    return (
      <PostBody
        key={post._id}
        author={post.user.username}
        author_link={'/users/' + post.user._id}
        body={post.body}
        date_created={formatDateFromDB(post.date_created)}
        avatar={post.user.avatar}
        signature={post.user.signature}
      />
    )
  })

  return (
    <div>
      <Head>
        <title>Blurbr - {title}</title>
      </Head>
      <Header />
      <TopicBody title={title} author={topic_author.username}
        body={body} date_created={formatDateFromDB(date_created)}
        signature={topic_author.signature} author_link={'/users/' + topic_author._id}
        avatar={topic_author.avatar}
      />
      {posts_list}
      <PostForm
        show={modal}
        toggle={toggleModal}
        id={_id}/>
      <Modal
        show={modal}
        toggle={toggleModal}>
        <h1>Post Successful!</h1>
      </Modal>
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
