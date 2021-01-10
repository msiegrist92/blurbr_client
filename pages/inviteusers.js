import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import axios from 'axios';

import checkToken from '../lib/utils/checkToken';

import Header from '../components/Header';
import NoSessionLock from '../components/NoSessionLock';
import SearchUser from '../components/search_user/SearchUser';


const Page = () => {

  const [session, setSession] = useState(false);

  //groups is equal to the groups that are owned by the user on session
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  }, [])

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_DEV_API + `/users/own_groups/${sessionStorage.token}`)
    .then((res) => {
      setGroups(res.data.groups_owned);
    })
  }, [session])

  return (
    <>
    <Head>
      <title>Blurbr - Invite Users</title>
    </Head>
    <Header />

    {!session &&
      <NoSessionLock>
        <h3 className='center_text'>Please log in to manage your groups</h3>
      </NoSessionLock>
    }

    {session &&
      <>
      <div className='container'>
        <h2 className='center_cont'>Search for a user to request that they join your group!</h2>
        <SearchUser groups={groups} />
    </div>
      </>
    }
    </>
  )
}

export default Page;
