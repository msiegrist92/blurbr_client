import React, {useState, useEffect} from 'react';
import Head from 'next/head';

import NavDropDown from './NavDropDown';

const Header = ({session}) => {

  const [navDisplay, setNavDisplay] = useState(false);

  const navController = (e, navDisplay) => {
    const icon = document.querySelector('.bars');
    const nav_list = document.querySelector('.drop_nav')
    if(navDisplay){
      icon.classList.toggle('grey');
      nav_list.classList.toggle('show_nav');
      setNavDisplay(false)
    } else {
      icon.classList.toggle('grey');
      nav_list.classList.toggle('show_nav');
      setNavDisplay(true);
    }
  }

  return (
    <>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossOrigin="anonymous" />
    </Head>
    <header className='header'>
      <div className='branding'>
        <a href='/'><h1>Blurbr</h1></a>
        <h4>Say whatever</h4>
      </div>
      <nav>
        <i className='bars icon huge'
          onClick={(e) => navController(e, navDisplay)}></i>
        <NavDropDown

          />
      </nav>
    </header>
    </>
  )
}

export default Header;
