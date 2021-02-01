import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';

import LoginForm from '../components/forms/LoginForm';
import Header from '../components/global/Header';
import Modal from '../components/utils/Modal';

import {checkToken} from '../lib/utils/rolesCheck'

const Login = () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [prev_link, setLink] = useState('');

  const toggleModal = (e, modal) => {
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }

  const goBack = e => {
    e.preventDefault();
    history.back();
  }

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  },[session])



  return (
    <div>
      <Header/>
       <Head>
         <title>Blurbr - Login</title>
        </Head>
      <div className='container'>
        <i
          style={{marginTop: '20px'}}
          className="center_cont user circle outline yellow massive icon"></i>
        <h2 className='center_cont'>Keep the conversation going!</h2>
      </div>
      <LoginForm
        toggle={toggleModal}
        show={modal}
        setSession={setSession}
         />
       <Modal
         show={modal}
         toggle={toggleModal}>
         <h1 className='center_text'>Welcome back!</h1>
         <a href='/mytopics'><h2>My Topics</h2></a>
         <a href='/mygroups'><h2>My Groups</h2></a>
         <a className='span_two_col'
           onClick={(e) => goBack(e)}
           ><h2>Return</h2></a>
       </Modal>
    </div>
  )
}

export default Login;
