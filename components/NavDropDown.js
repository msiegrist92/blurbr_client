import React, {useState} from 'react';

const NavDropDown = ({show, session}) => {

  console.log('sesh in ndd', session)

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
      <ul className='drop_nav'>
        <li><a href='/me'>My Profile</a></li>
        <li><a>Help</a></li>
        <li className='sub_nav_head'><a>Topics</a>
          <ul>
            <li><a href='/topics'>My Topics</a></li>
            <li><a>Latest</a></li>
          </ul>
        </li>
        <li className='sub_nav_head'><a>Groups</a>
          <ul>
            <li><a>My Groups</a></li>
            <li><a href='/groups'>Global</a></li>
          </ul>
        </li>
      </ul>
    }
    </>
  )
}

export default NavDropDown;
