import React, {useState} from 'react';
import axios from 'axios';

const RegisterUser = () => {

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');


  const registerUser = e => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/user/register', {
      email,
      password,
      username,
      //remove signature when recreating database
      signature: ''
    }).then((res) => {
      //store token in sessionStorage for adding to API requests
      //on success redirect user to customize with signature and avatar
      if(res.status === 201){
        setStatus('Register successful!')
      }
      sessionStorage.setItem('token', res.data.token);
      window.location.href = ('/topics');
    }).catch((e) => {
      setStatus(e.response.data);
    })
  }


  return (
    <div className='center_cont'>
      <form
        className='register_form'
        onSubmit={(e) => {registerUser(e)}}>

        <input
          className='text_focus'
          placeholder='Email'
          required id="email" type='text'
          value={email} name='email'
          onChange={e => setEmail(e.target.value)}
        />


        <input
          className='text_focus'
          placeholder="Username"
          required id="username" type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />


        <input
          className='text_focus'
          placeholder='Password'
          required id="password" type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />


        <input
          className='center_cont'
          type='submit'
          value='Register'/>

      </form>
      <h2>{status}</h2>
    </div>
  )
}

export default RegisterUser;
