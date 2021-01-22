import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';
import checkToken from '../../lib/utils/checkToken';
import checkOwner from '../../lib/utils/checkOwner';

import {pressCard, getSlideNum, depressCards} from '../../lib/utils/manageGroup';
import {removeUsers, removeTopics} from '../../lib/api/adminRemove';

import Modal from '../../components/utils/Modal';
import GroupInfo from '../../components/groups/GroupInfo';
import SessionProtectPage from '../../components/SessionProtectPage';

import RemoveList from '../../components/manage_group/RemoveList';
import SearchUser from '../../components/search_user/SearchUser';
import DisbandGroup from '../../components/manage_group/DisbandGroup';
import AdminPanel from '../../components/manage_group/AdminPanel';

import BigSlider from '../../components/manage_group/BigSlider';

const Page = ({group_data}) => {

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  const {name, owner, topics, users, description} = group_data;
  const page_title = `Admin - ${name}`;

  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);


    useEffect(() => {
      setSession(checkToken(sessionStorage.token));
      if(session){
        setSession(checkOwner(sessionStorage.token, owner._id))
      }
    }, [])

  const panel_config = [{
    slide_num: '1',
    icon_class: 'envelope open outline',
    title: 'Invite Users'
  },
  {
    slide_num: '2',
    icon_class: 'thumbs down',
    title: 'Remove Users'
  },
  {
    slide_num: '3',
    icon_class: 'close',
    title: 'Remove Topics'
  },
  {
    slide_num: '4',
    icon_class: 'trash alternate',
    title: 'Disband Group'
  }];

  const slides = [<div key='1'></div>,
    <SearchUser key='2' groups={[group_data]} />,
    <RemoveList key='3' group_id={group_data._id} dataset={users} removerFunc={removeUsers} title='User Name' list_type='user'/>,
    <RemoveList key='4' group_id={group_data._id} dataset={topics} removerFunc={removeTopics} title='Topic' list_type='topic' />,
    <DisbandGroup key='5' toggleModal={toggleModal} modal={modal} group_data={group_data} />];

  const changeSlide = e => {

    const cards = document.querySelectorAll('.manage_card');
    let card = e.target;
    if(e.target.tagName !== 'DIV'){
      card = e.target.parentElement;
    }
    let icon = card.querySelector('i');
    depressCards(cards, card);
    pressCard(card, icon);
    let slide_num = getSlideNum(card.classList);
    setIndex(slide_num)
  }

  const disbandGroup = (e, group_id) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/groupmgmt/disbandgroup', {
      group_id,
      user_token: sessionStorage.token,
      token: sessionStorage.token
    }).then((res) => {
      alert('Group disbanded');
      location.href = '/mygroups';
    }).catch((err) => {
      console.log(err);
    })
  }





  return (

          <>
          <SessionProtectPage page_title={page_title} no_session_title='Please log in to view groups'
              session={session}>

            <div className='container'>

              <h1 className='center_text'>Welcome {owner.username}, manage your group "{name}"</h1>

              <AdminPanel changeSlide={changeSlide} config={panel_config} />

            </div>

            <BigSlider index={index} slides={slides} />


            <Modal
              show={modal}
              toggle={toggleModal}
              >

              <h2 className='center_cont span_two_col'>Are you sure you want to disband <i>{group_data.name}</i> ?</h2>
              <button
                className='center_cont call_to span_two_col'
                onClick={(e) => {disbandGroup(e, group_data._id)}}
                >Proceed</button>

            </Modal>
            </SessionProtectPage>
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
