import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';

import Header from '../components/Header';
import TopicList from '../components/topics/TopicList.js';
import TopicForm from '../components/forms/TopicForm';
import Modal from '../components/Modal';

import formatDateFromDB from '../lib/utils/formatDateFromDB';

const Topics = ({topics}) => {

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  const [modal, setModal] = useState(false);

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
    <div id='topics'>
      <Head>
          <title>Blurbr Topics</title>
      </Head>
      <Header />
      <Modal
        show={modal}
        toggle={toggleModal}
      >
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
