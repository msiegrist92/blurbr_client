import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/Header';
import Modal from '../components/Modal';
import NoSessionLock from '../components/NoSessionLock';
import GroupCard from '../components/groups/GroupCard';

import formatDateFromDB from '../lib/utils/formatDateFromDB';

const Groups = ({groups}) => {

  console.log(groups);

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState('');

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }

  useEffect(() => {
    if(!sessionStorage.token){
      return setSession(false);
    } else {
      setSession(true);
      const user_id = jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
      setUser(user_id);
      //axios call to user_groups
    }
  }, [])



  return (
    <>
    <Head>
      <title>Blurbr Groups</title>
    </Head>
    <Header />

    {!session &&
      <NoSessionLock>
        <h3 className='center_text'>Please log in or register to view groups</h3>
      </NoSessionLock>
    }
    </>

  )

}

export async function getStaticProps(){

  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/groups').then((res) => {
    return {
      props: {
        groups: res.data
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}

export default Groups;
