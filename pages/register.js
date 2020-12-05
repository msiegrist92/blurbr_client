import axios from 'axios';
import React, { useState } from 'react';

import RegisterUser from '../components/forms/RegisterUser';
import Header from '../components/Header';

const Register = () => {

  return (
    <div>
      <Header />
      <h1 className='center_text'>Let's hear it!</h1>
      <div className='container'
        style={{marginTop: '20px'}}>
        <i className='yellow bullhorn icon massive center_cont'
          ></i>
        <RegisterUser />
      </div>
    </div>
  )
}

export default Register;
