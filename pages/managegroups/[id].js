import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link'

import {getDocById, getIds} from '../../lib/api/dynamicRouting.js';
import checkToken from '../../lib/utils/checkToken';
import checkOwner from '../../lib/utils/checkOwner';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import GroupInfo from '../../components/groups/GroupInfo';
import NoSessionLock from '../../components/NoSessionLock';

import BigSlider from '../../components/manage_group/BigSlider';

const Page = ({group_data}) => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

  const {name, owner, topics, users, description} = group_data;

  const [index, setIndex] = useState(0);

  const slides = ['', <h1>Invite Users</h1>, <h1>Remove Users</h1>, <h1>Remove Topics</h1>, <h1>Disband Groupr</h1>]

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  const changeSlide = e => {

    const slide_REGEXP = /slide_link_\d/g

    let card = e.target;

    let slide_num;

    if(e.target.tagName !== 'DIV'){
      card = e.target.parentElement;
    }
    let icon = card.querySelector('i');

    card.classList.add('pressed_card')
    icon.classList.remove('yellow');
    icon.classList.add('purple')


    for(let clas of card.classList){
      if(clas.match(slide_REGEXP) !== null)
        slide_num = clas.charAt(clas.length - 1);
    }
    setIndex(slide_num)
  }


  console.log(group_data)

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
              <h1>Welcome {owner.username}, manage your group "{name}"</h1>

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
              <h1>Shwaddup</h1>
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
