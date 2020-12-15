import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/Header';
import TopicList from '../components/topics/TopicList.js';
import TopicForm from '../components/forms/TopicForm';
import Modal from '../components/Modal';
import NoSessionLock from '../components/NoSessionLock';

import formatDateFromDB from '../lib/utils/formatDateFromDB';


const Topics = () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState('');
  const [topics, setTopics] = useState([]);
  const [groups, setGroups] = useState([]);

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  useEffect(() => {
    if(!sessionStorage.token){
      return setSession(false)
    } else {
      setSession(true)
      const user_id = jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
      axios.get(process.env.NEXT_PUBLIC_DEV_API + '/user_topics/' + user_id)
      .then((res) => {
        console.log(res)
        //store user ID
        setUser(user_id);
        setTopics(res.data.user_topics);
        setGroups(res.data.user_groups);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [])



  // add conditonal for topic_list.length = 0
  // edit to display with group information per topics
  //hide second create group button if list < 2

  let topic_list;

  if(topics.length > 0){
    topic_list = topics.map((topic) => {
      return (
        <TopicList
          key={topic._id}
          title={topic.title}
          body={topic.body}
          author={topic.author.username}
          author_link={'/users/' + topic.author._id}
          date={formatDateFromDB(topic.date_created)}
          topic_link={'/topics/' + topic._id}
          length={topic.posts.length}
          group_name={topic.group.name}
          group_link={'/groups/' + topic.group._id}
        />
      )
    })
  } else {
    topic_list = <h2 className='center_text'>No topics available. Get one started!</h2>
  }


  return (
    <div id='topics'>
      <Head>
          <title>Blurbr Topics</title>
      </Head>
      <Header />

        {!session &&
          <NoSessionLock>
            <h3 className='center_text'>Please log in or register to view topics</h3>
          </NoSessionLock>
        }

        {session &&
          <>
          <Modal
            show={modal}
            toggle={toggleModal}>
            <h1 className='center_text'>Create a new post</h1>
            <TopicForm
              user={user}
              groups={groups}
              />
          </Modal>

          <h1 className='center_text'>Topics</h1>

          <div className='container'>
            <button
              className='big_button pos_right'
              onClick={(e, modal) => {
                toggleModal(e, modal)
                }}>Create Post</button>
          </div>

          <ul className='container'>
            {topic_list}
          </ul>

          {topics.length > 2 &&
            <div className='container'>
              <button
                style={{marginBottom: '20px'}}
                className='big_button pos_right'
                onClick={(e, modal) => {
                  toggleModal(e, modal)
                  }}>Create Post</button>
            </div>
          }
          </>
        }
    </div>
  )
}

//topics cannot be generated server side to be populated with unique topics per user based on users access token
// export async function getServerSideProps(){
//
//   return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/topic').then((res) => {
//     return {
//       props : {
//         topics: res.data
//       }
//     }
//   }).catch((err) => {
//     console.log(err);
//   })
//
// }

export default Topics;
