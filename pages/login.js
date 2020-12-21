import React, {useState, useEffect} from 'react';
import axios from 'axios';

import LoginForm from '../components/forms/LoginForm';
import Header from '../components/Header';
import Modal from '../components/Modal';

import checkToken from '../lib/utils/checkToken';

const Login = () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

  const toggleModal = (e, modal) => {
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  },[session])



  return (
    <div>
      <Header
        session={session}
         />
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
       </Modal>
    </div>
  )
}

export default Login;
