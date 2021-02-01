import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import Modal from '../components/utils/Modal';
import GroupCard from '../components/groups/GroupCard';
import SearchRenderList  from '../components/utils/SearchRenderList';
import SessionProtectPage from '../components/SessionProtectPage';

import formatDateFromDB from '../lib/utils/formatDateFromDB';
import {checkToken} from '../lib/utils/rolesCheck'


const MyCircle = () => {

  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState('');
  const [groups, setGroups] = useState([]);
  const [show_groups, setShowGroups] = useState([]);

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
    if(user){
      axios.get(process.env.NEXT_PUBLIC_DEV_API + '/member_groups/' + user,
    {
      headers: {
        'Authorization': sessionStorage.token
      }
    })
        .then((res) => {
          console.log(res)
          setGroups(res.data)
          setShowGroups(res.data)
        }).catch((err) => {
          console.log(err);
        })
    }
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
      users_list={group.users}
      most_recent={group.most_recent}
      user={user}
      owns={user === group.owner._id}
      />
    )
  })

  const search_options = [{
    value: 'name',
    title: "Name"
  },
  {
    value: 'description',
    title: "Description"
  }]

  return (
    <>
      <SessionProtectPage page_title='My Circle' no_session_title='Please log in to view groups'
          session={session}>
      <div className='container'>

        <SearchRenderList to_search={groups} setList={setShowGroups}
            default_option='name' title='Search Groups' options={search_options} />

        <a className='center_cont' href='/newgroup'><button style={{marginTop: '1em'}}
          className='call_to'>Create New Group</button></a>
      </div>
      <ul className='group_card_grid'>
        {group_cards}
      </ul>
      </SessionProtectPage>
    </>
  )
}

export default MyCircle;
