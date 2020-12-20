import React, {useState} from 'react';
import axios from 'axios';

import LoginForm from '../components/forms/LoginForm';
import Header from '../components/Header';

const Login = () => {



  return (
    <div>
      <Header />
      <div className='container'>
        <i
          style={{marginTop: '20px'}}
          class="center_cont user circle outline yellow massive icon"></i>
        <h2 className='center_cont'>Keep the conversation going!</h2>
      </div>
      <LoginForm />
    </div>
  )
}

export default Login;
