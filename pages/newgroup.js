import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/global/Header';
import Modal from '../components/utils/Modal';
import NoSessionLock from '../components/utils/NoSessionLock';
import CreateGroup from '../components/forms/CreateGroup';

import checkToken from '../lib/utils/checkToken';

const createGroup = () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
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
      <>
      <Modal
        show={modal}
        toggle={toggleModal}>
        <h1>Group Created</h1>
        <a className='span_two_col' href='#'><button className='call_to'>Invite Users</button></a>
      </Modal>

      <div className='container'>
        <i className="users icon massive yellow center_cont"></i>
        <h1 className='center_text'>Create a group</h1>
        <CreateGroup
          modal={modal}
          toggleModal={toggleModal}
        />
      </div>
      </>
    }

    </>
  )
}

export default createGroup;
