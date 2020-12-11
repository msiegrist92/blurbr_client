import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/Header';
import TopicList from '../components/topics/TopicList.js';
import TopicForm from '../components/forms/TopicForm';
import Modal from '../components/Modal';

import formatDateFromDB from '../lib/utils/formatDateFromDB';


const Topics = () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

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
      }).catch((err) => {
        console.log(err);
      })
      //retrieve user topics by user groups and generate topic list with
      //set session to true to display on page
      //get user groups
      //get topics that belong to that group
      //topic list conditonal if no groups
    }
  })

  const topic_list = 'true'

  // const topic_list = topics.map((topic) => {
  //   return (
  //     <TopicList
  //       key={topic._id}
  //       title={topic.title}
  //       body={topic.body}
  //       author={topic.author.username}
  //       author_link={'/users/' + topic.author._id}
  //       date={formatDateFromDB(topic.date_created)}
  //       topic_link={'/topics/' + topic._id}
  //       length={topic.length}
  //     />
  //   )
  // })

  return (
    <div id='topics'>
      <Head>
          <title>Blurbr Topics</title>
      </Head>
      <Header />

        {!session &&
          <div id='no_sesh' className='container'>
            <i style={{marginTop: '20px'}}className='yellow icon lock massive center_cont'></i>
            <h3 className='center_text'>Please log in or register to view topics</h3>
            <a href='/register'><button className='big_button' >Register</button></a>
            <a href='/login'><button className='big_button' >Log In</button></a>
          </div>
        }

        {session &&
          <>
          <Modal
            show={modal}
            toggle={toggleModal}>
            <h1 className='center_text'>Create a new post</h1>
            <TopicForm />
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

          <div className='container'>
            <button
              style={{marginBottom: '20px'}}
              className='big_button pos_right'
              onClick={(e, modal) => {
                toggleModal(e, modal)
                }}>Create Post</button>
          </div>
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
