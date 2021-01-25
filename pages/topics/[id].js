import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {getIds, getDocById} from '../../lib/api/dynamicRouting';
import formatDateFromDB from '../../lib/utils/formatDateFromDB';
import checkToken from '../../lib/utils/checkToken';
import checkMember from '../../lib/utils/checkMember';

import SessionProtectPage from '../../components/SessionProtectPage';
import TopicBody from '../../components/topics/TopicBody';
import PostForm from '../../components/forms/PostForm';
import PostBody from '../../components/posts/PostBody';
import Modal from '../../components/utils/Modal';


const Page = ({topic_data, users_allowed}) => {

  const {topic} = topic_data;
  const topic_author = topic.user;

  const {posts, _id, title, body, author, date_created} = topic;

  const page_title = `Blurbr - ${title}`;

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

  const [member, setMember] = useState(false);

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
    setSession(checkMember(users_allowed, sessionStorage.token));
  }, [])

  const toggleModal = (e, modal) => {
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }


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

          <>
          <SessionProtectPage page_title={page_title} no_session_title='Please join group to view this topic'
            session={session}>

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

          </SessionProtectPage>
          </>

  )
}

export async function getStaticProps({params}){

  return {
     props : {
       topic_data : await getDocById(process.env.NEXT_PUBLIC_DEV_API + '/topic/', params.id).then((res) => {
         return res;
       }),
       users_allowed: await axios.get(`${process.env.NEXT_PUBLIC_DEV_API}/topic/${params.id}/usersallowed`, {
         headers  : {
           'Authorization' : process.env.NEXT_PUBLIC_PATHS_SECRET
         }
       }).then((res) => {
         return res.data
       })
     }
   }
}

export async function getStaticPaths(){
  return {
    paths: await getIds(process.env.NEXT_PUBLIC_DEV_API + '/topics', '_id').then((res) => {
      return res;
    }),
    fallback: false
  }
}

export default Page;
