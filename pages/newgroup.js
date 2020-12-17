import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/Header';
import Modal from '../components/Modal';
import NoSessionLock from '../components/NoSessionLock';

import checkToken from '../lib/utils/checkToken';

const createGroup = () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
    if(session){
      setUser(jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id);
    }
  }, [])

  return (
    <>
    <Head>
      <title>Create a Group</title>
    </Head>
    <Header />

    {!session &&
      <NoSessionLock>
        <h3 className='center_text'>Please log in or register to create groups</h3>
      </NoSessionLock>
    }

    {session &&
      <h1>U log in </h1>
    }

    </>
  )
}

export default createGroup;
