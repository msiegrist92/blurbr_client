import React, {useState} from 'react';
import axios from 'axios';

import LoginForm from '../components/forms/LoginForm';
import Header from '../components/Header';

const Login = () => {



  return (
    <div>
      <Header />
      <LoginForm />
    </div>
  )
}

export default Login;
