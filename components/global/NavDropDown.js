import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {checkToken} from '../../lib/utils/rolesCheck';
import Modal from '../utils/Modal';

const NavDropDown = () => {

  const [session, setSession] = useState(false);

  useEffect(() => {
    setSession(checkToken(sessionStorage.token))
  })



  const endSessions = e => {
    e.preventDefault();
    const token = sessionStorage.token;
    if(!token){
      return alert('No current session');
    }
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/users/logout', {
      token: sessionStorage.token
    }).then((res) => {
      sessionStorage.removeItem('token');
      setSession(false);
      const icon = document.querySelector('.bars');
      icon.classList.toggle('grey')
    }).catch((err) => {
      console.log(err);
    })

  }

  return (
    <>
    {!session &&
      <ul className='drop_nav'>
        <li><a href='/login'>Log In</a></li>
        <li><a href='/register'>Register</a></li>
        <li><a>About</a></li>
        <li><a>Help</a></li>
      </ul>
    }

    {session &&
      <>
      <ul className='drop_nav'>
        <li><a href='/me'>My Profile</a></li>
        <li><a>Help</a></li>
        <li className='sub_nav_head'><a>Topics</a>
          <ul>
            <li><a href='/mytopics'>My Topics</a></li>
            <li><a href='/alltopics'>All Topics</a></li>
          </ul>
        </li>
        <li className='sub_nav_head'><a>Groups</a>
          <ul>
            <li><a href='/groups'>Global</a></li>
            <li><a href='/mygroups'>My Groups</a></li>
            <li><a href='/mycircle'>My Circle</a></li>
          </ul>
        </li>
        <li><a onClick={(e) => endSessions(e)}>Logout</a></li>
      </ul>
      </>
    }
    </>
  )
}

export default NavDropDown;
