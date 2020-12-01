import axios from 'axios';
import React, { useState } from 'react';

import RegisterUser from '../components/forms/RegisterUser';
import Header from './Header';

const Register = () => {

  return (
    <div>
      <Header />
      <RegisterUser />
    </div>
  )
}

export default Register;
