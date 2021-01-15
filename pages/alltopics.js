import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/Header';
import TopicList from '../components/topics/TopicList.js';
import TopicForm from '../components/forms/TopicForm';
import Modal from '../components/Modal';
import NoSessionLock from '../components/NoSessionLock';
import SearchTopics from '../components/topics/SearchTopics';
import SearchRenderList from '../components/SearchRenderList';

import SortOptions from '../components/topics/SortOptions';

import formatDateFromDB from '../lib/utils/formatDateFromDB';
import checkToken from '../lib/utils/checkToken';

const AllTopics= () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState('');
  const [topics, setTopics] = useState([]);
  const [groups, setGroups] = useState([]);
  const [show_topics, setShow] = useState([]);

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  }, [])

  useEffect(() => {
    if(session){
      setUser(jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id);
    }
  }, [session])

  useEffect(() => {
    console.log(user)
    axios.get(process.env.NEXT_PUBLIC_DEV_API + '/member_topics/' + user)
      .then((res) => {
        setTopics(res.data.member_topics);
        setShow(res.data.member_topics);
        setGroups(res.data.user_groups);
      }).catch((err) => {
        console.log(err);
      })
  }, [user])

  const search_options = [{
    value: 'title',
    title: "Title"
  }, {
    value: 'body',
    title: 'Body'
  }]

  let topic_list;

  if(topics.length > 0){
    topic_list = show_topics.map((topic) => {
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
    topic_list = [<h2 key='single' className='center_text'>Join a group or make a topic to get started!</h2>]
  }


  return (
    <div id='topics'>
      <Head>
          <title>Blurbr - Topics</title>
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
            <h1 className='center_text'>Create a new topic</h1>
            <TopicForm
              user={user}
              groups={groups}
              />
          </Modal>

          <h1 className='center_text'>Topics</h1>

          <div className='container'>

            <SearchRenderList to_search={topics} setList={setShow}
                default_option='title' title='Search Topics' options={search_options} />

            <SortOptions topics={show_topics} setTopics={setShow} />

            <button
              className='big_button pos_right'
              onClick={(e, modal) => {
                toggleModal(e, modal)
              }}>Create Topic</button>
          </div>

          <ul className='container'>
            {topic_list.reverse()}
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


export default AllTopics;
