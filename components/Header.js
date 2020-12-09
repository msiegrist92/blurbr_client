import React, {useState, useEffect} from 'react';
import Head from 'next/head';

import NavDropDown from './NavDropDown';


const Header = () => {

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
        <i className='bars icon huge'></i>
        <NavDropDown />
      </nav>
    </header>
    </>
  )
}

export default Header;
