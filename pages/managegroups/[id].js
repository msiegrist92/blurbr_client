import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link'

import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';
import checkToken from '../../lib/utils/checkToken';
import checkOwner from '../../lib/utils/checkOwner';

import {pressCard, getSlideNum, depressCards} from '../../lib/utils/manageGroup';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import GroupInfo from '../../components/groups/GroupInfo';
import NoSessionLock from '../../components/NoSessionLock';
import SearchUser from '../../components/search_user/SearchUser';
import RemoveUsers from '../../components/manage_group/RemoveUsers';

import BigSlider from '../../components/manage_group/BigSlider';

const Page = ({group_data}) => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

  const {name, owner, topics, users, description} = group_data;

  const [index, setIndex] = useState(0);

  const slides = ['', <SearchUser groups={[group_data]} />, <RemoveUsers group_data={group_data} />, <h1>Remove Topics</h1>, <h1>Disband Groupr</h1>]

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

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


  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
    if(session){
      setSession(checkOwner(sessionStorage.token, owner._id))
    }
  }, [])


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
            <div className='container'>
              <h1 className='center_text'>Welcome {owner.username}, manage your group "{name}"</h1>

              <div className='color_container two_col_fr container gap_4'>

                <div className='manage_card slide_link_1'
                  onClick={(e) => {changeSlide(e)}}
                  >
                    <i className='envelope open outline icon massive yellow'></i>
                    <h2>Invite Users</h2>
                </div>

                <div className='manage_card slide_link_2'
                  onClick={(e) => {changeSlide(e)}}
                  >
                    <i className='thumbs down icon massive yellow'></i>
                    <h2>Remove Users</h2>
                </div>

                <div className='manage_card slide_link_3'
                  onClick={(e) => {changeSlide(e)}}
                  >
                    <i className='close icon massive yellow'></i>
                    <h2>Remove Topics</h2>
                </div>

                <div className='manage_card slide_link_4'
                  onClick={(e) => {changeSlide(e)}}
                  >
                    <i className='trash alternate icon massive yellow'></i>
                    <h2>Disband Group</h2>
                </div>

              </div>
            </div>
            <BigSlider index={index} slides={slides}>
            </BigSlider>
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
