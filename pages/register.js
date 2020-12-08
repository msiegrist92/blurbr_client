import axios from 'axios';
import React, { useState } from 'react';

import RegisterUser from '../components/forms/RegisterUser';
import Header from '../components/Header';
import Modal from '../components/Modal';

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
      <Header />
      <Modal
        show={modal}
        toggle={toggleModal}>
        <h1 className='center_text'>Welcome to Blurbr!</h1>
        <a href='/topics'><h2>Topics</h2></a>
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
