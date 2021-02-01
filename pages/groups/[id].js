import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';
import {checkToken, checkOwner} from '../../lib/utils/rolesCheck';

import SessionProtectPage from '../../components/SessionProtectPage';
import Modal from '../../components/utils/Modal';
import {genList} from '../../lib/utils/genListIfUser';

import CaretTurnDropDown from '../../components/utils/CaretTurnDropDown';
import GroupInfo from '../../components/groups/GroupInfo';
import TopicForm from '../../components/forms/TopicForm';


const Page = ({group_data}) => {

  const page_title = `Blurbr - ${group_data.name}`;

  const {name, owner, topics, users, description} = group_data;
  const groups = [group_data];

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [isOwner, setOwner] = useState(false);

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
    setOwner(checkOwner(sessionStorage.token, owner._id));
  }, [])

  const topics_list = genList(topics, 'topic');

  const user_list = genList(users, 'user');

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
      <SessionProtectPage page_title={page_title} no_session_title="Please log in to view groups"
          session={session}>

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
              }}>Create Topic</button>
            {isOwner &&
              <a className='self_center' href='/'>
                <button className='call_to'>Manage your group</button>
              </a>
            }
          </div>

        <div className='container drops_cont'>

          <CaretTurnDropDown list={topics_list} class_name={'topics_list'}
            list_name={'Topics'} h1_class={'topics'}
          />

          <CaretTurnDropDown list={user_list} class_name={'user_list'}
            list_name={'Users'} h1_class={'users'}
          />

        </div>

        <Modal
          show={modal} toggle={toggleModal}
          >
          <TopicForm groups={groups} />
        </Modal>

      </SessionProtectPage>
    </>
  )
}


export async function getStaticProps({params}){
  return {
     props : {
       group_data : await getDocById(process.env.NEXT_PUBLIC_DEV_API + '/group/', params.id).then((res) => {
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
