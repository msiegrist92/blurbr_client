import React from 'react';

const NoSessionLock = ({children}) => {
  return (
    <div className='container' id='no_sesh'>
    <i style={{marginTop: '20px'}}className='yellow icon lock massive center_cont'></i>
    {children}
    <a href='/register'><button className='big_button' >Register</button></a>
    <a href='/login'><button className='big_button' >Log In</button></a>
    </div>
  )
}

export default NoSessionLock;
