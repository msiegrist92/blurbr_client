import React, { useState } from 'react';
import Head from 'next/head';

import RegisterUser from '../components/forms/RegisterUser';
import Header from '../components/global/Header';
import Modal from '../components/utils/Modal';

const Register = () => {

  const [modal, setModal] = useState(false)

  const toggleModal = (e, modal) => {
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }

  return (
    <div>
      <Head>
        <title>Blurbr - Register</title>
      </Head>
      <Header />
      <Modal
        show={modal}
        toggle={toggleModal}>
        <h1 className='center_text'>Welcome to Blurbr!</h1>
        <a href='/groups'><h2>Find a group</h2></a>
        <a href='/me'><h2>Customize Profile</h2></a>
      </Modal>
      <h1 className='center_text'>Let's hear it!</h1>
      <div className='container'
        style={{marginTop: '20px'}}>
      <i
        className='yellow bullhorn icon massive center_cont'>
      </i>
      <RegisterUser
        toggle={toggleModal}
        show={modal} />
      </div>
    </div>
  )
}

export default Register;
