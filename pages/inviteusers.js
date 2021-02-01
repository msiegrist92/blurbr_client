import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import axios from 'axios';

import {checkToken} from '../lib/utils/rolesCheck'

import SearchUser from '../components/search_user/SearchUser';

import SessionProtectPage from '../components/SessionProtectPage';


const Page = () => {

  const [session, setSession] = useState(false);

  //groups is equal to the groups that are owned by the user on session
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  }, [])

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_DEV_API + `/users/own_groups/${sessionStorage.token}`,
    {
      headers: {
        'Authorization': sessionStorage.token
      }
    })
    .then((res) => {
      setGroups(res.data.groups_owned);
    })
  }, [session])

  return (
    <>
    <SessionProtectPage page_title='Invite Users' no_session_title='Please log in to manage your groups'
      session={session}>
      <div className='container'>
        <h2 className='center_cont'>Search for a user to request that they join your group!</h2>
        <SearchUser groups={groups} />
      </div>
    </SessionProtectPage>
    </>
  )
}

export default Page;
