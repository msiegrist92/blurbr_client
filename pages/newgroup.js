import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import Modal from '../components/utils/Modal';
import CreateGroup from '../components/forms/CreateGroup';
import SessionProtectPage from '../components/SessionProtectPage';

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
      <SessionProtectPage page_title='New Group' no_session_title='Please log in to manage groups'
        session={session}>

        <Modal
          show={modal}
          toggle={toggleModal}>
          <h1>Group Created</h1>
          <a className='span_two_col' href='/inviteusers'><button className='call_to'>Invite Users</button></a>
        </Modal>

        <div className='container'>

          <i className="users icon massive yellow center_cont"></i>
          <h1 className='center_text'>Create a group</h1>
          <CreateGroup
            modal={modal}
            toggleModal={toggleModal}
          />

        </div>

      </SessionProtectPage>

    </>
  )
}

export default createGroup;
