import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

import Header from '../components/Header';
import Modal from '../components/Modal';
import NoSessionLock from '../components/NoSessionLock';
import GroupCard from '../components/groups/GroupCard';

import formatDateFromDB from '../lib/utils/formatDateFromDB';

const Groups = ({groups}) => {

  console.log(groups);

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState('');

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }

  useEffect(() => {
    if(!sessionStorage.token){
      return setSession(false);
    } else {
      setSession(true);
      const user_id = jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
      setUser(user_id);
      //axios call to user_groups
    }
  }, [])

  const group_cards = groups.map((group) => {
    return (
    <GroupCard
      key={group._id}
      group_id={group._id}
      name={group.name}
      owner={group.owner.username}
      owner_id={group.owner._id}
      topics={group.topics.length}
      users={group.users.length}
      most_recent={group.most_recent.title}
      most_recent_id={group.most_recent._id}
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
      <div className='container'>
        <ul className='group_card_grid'>
          {group_cards}
        </ul>
      </div>
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
