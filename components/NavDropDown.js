import React, {useState} from 'react';

const NavDropDown = ({show}) => {

  return (
    <ul className='drop_nav'>
      <a href='/topics'><li>Topics</li></a>
      <a href='/me'><li>My Profile</li></a>
    </ul>
  )
}

export default NavDropDown;
