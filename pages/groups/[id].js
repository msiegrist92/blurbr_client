import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';


import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';
import checkToken from '../../lib/utils/checkToken';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import CaretTurnDropDown from '../../components/CaretTurnDropDown';
import TopicListDropDown from '../../components/topics/TopicListDropDown';
import GroupInfo from '../../components/groups/GroupInfo';
import UserListDropDown from '../../components/user/UserListDropDown';
import TopicForm from '../../components/forms/TopicForm';
import NoSessionLock from '../../components/NoSessionLock';

const Page = ({group_data}) => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

  const {name, owner, topics, users, description} = group_data;

  const groups = [group_data]

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  }, [])

  const topics_list = topics.map((topic) => {
    return <TopicListDropDown key={topic._id} topic={topic} />
  })

  const user_list = users.map((user) => {
    return <UserListDropDown key={user._id} user={user} />
  })

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  return (
    <>
      <Head>
        <title>Blurbr - {name}</title>
      </Head>
      <Header />

        {!session &&
          <NoSessionLock>
            <h3 className='center_text'>Please log in or register to view groups</h3>
          </NoSessionLock>
        }

        {session &&
          <>
          <GroupInfo
            name={name} owner={owner} num_topics={topics.length} num_users={users.length}
            description={description}
          />
          <div className='container'>
            <button
              style={{marginBottom: '1.5em'}}
              className='big_button center_cont'
              onClick={(e, modal) => {
                toggleModal(e, modal)
                }}>Create Post</button>
          </div>
          <Modal
            show={modal} toggle={toggleModal}
            >
            <TopicForm groups={groups} />
          </Modal>
        <div className='container drops_cont'>
          <CaretTurnDropDown list={topics_list} class_name={'topics_list'}
            list_name={'Topics'} h1_class={'topics'}
          />
          <CaretTurnDropDown list={user_list} class_name={'user_list'}
            list_name={'Users'} h1_class={'users'}
          />
        </div>
        </>
        }
    </>
  )
}


export async function getStaticProps({params}){
  return {
     props : {
       group_data : await getDocById(process.env.NEXT_PUBLIC_DEV_API + '/group/', params.id).then((res) => {
         console.log(res)
         return res;
       })
     }
   }
}

export async function getStaticPaths(){
  return {
    paths: await getIds(process.env.NEXT_PUBLIC_DEV_API + '/groups', '_id').then((res) => {
      return res;
    }),
    fallback: false
  }
}

export default Page;
