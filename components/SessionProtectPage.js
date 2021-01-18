import React, {useState, useEffect} from 'react';
import Head from 'next/head'

import Header from '../components/global/Header';
import Modal from '../components/utils/Modal';
import NoSessionLock from '../components/utils/NoSessionLock';

import checkToken from '../lib/utils/checkToken'

const SessionProtectPage = ({page_title, no_session_title, children, session


  }) => {

  return (
    <>
      <Head>
        <title>Blurbr - {page_title}</title>
      </Head>
      <Header />

      {!session &&
        <NoSessionLock>
          <h3 className='center_text'>{no_session_title}</h3>
        </NoSessionLock>
      }

      {session &&
        <>
        {children}
        </>
      }

    </>
  )
}

export default SessionProtectPage;
