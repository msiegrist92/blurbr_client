import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/Header';
import Modal from '../components/Modal';
import NoSessionLock from '../components/NoSessionLock';
import GroupCard from '../components/groups/GroupCard';
import SearchGroups from '../components/groups/SearchGroups';

import formatDateFromDB from '../lib/utils/formatDateFromDB';
import checkToken from '../lib/utils/checkToken';

const Groups = ({groups}) => {

  console.log(groups)

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState('');
  const [show_groups, setGroups] = useState([]);

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  }, [])

  useEffect(() => {
    if(session){
      setUser(jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id);
    }
  }, [session])

  useEffect(() => {
    setGroups(groups)
  }, [user])
  const group_cards = show_groups.map((group) => {
    return (
    <GroupCard
      key={group._id}
      group_id={group._id}
      name={group.name}
      owner={group.owner.username}
      owner_id={group.owner._id}
      topics={group.topics.length}
      users={group.users.length}
      most_recent={group.most_recent}
      user={user}
      users_list={group.users}
      owns={user === group.owner._id}
      />
    )
  })

  return (
    <>
    <Head>
      <title>Blurbr Groups</title>
    </Head>
    <Header />

    {!session &&
      <NoSessionLock>
        <h3 className='center_text'>Please log in or register to view groups</h3>
      </NoSessionLock>
    }

    {session &&
      <>
      <div className='container'>
        <SearchGroups groups={groups} setGroups={setGroups} />
        <a className='center_cont' href='/newgroup'><button
          style={{marginTop: '1em'}}
          className='call_to'>Create New Group</button></a>
      </div>
      <ul className='group_card_grid'>
        {group_cards}
      </ul>
      </>
    }

    </>

  )

}

export async function getStaticProps(){

  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/groups').then((res) => {
    return {
      props: {
        groups: res.data
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}

export default Groups;
