import React, {useState, useEffect} from 'react';


const Header = () => {

  return (
    <header className='header'>
      <div class='branding'>
        <h1>Blurbr</h1>
        <h4>Say whatever</h4>
      </div>
      <nav>
        <a href='/topics'><h2>Topics</h2></a>
        <a href='/me'><h2>Me</h2></a>
      </nav>
    </header>
  )
}

export default Header;
