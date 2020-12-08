import React, {useState} from 'react';
import axios from 'axios';

const RegisterUser = ({toggle, show}) => {

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
    }).then((res) => {
      if(res.status === 201){
        toggle(e, show)
      }
      sessionStorage.setItem('token', res.data.token);
    }).catch((e) => {
      setStatus(e.response.data);
    })
  }

  //we want modal to pop up with a welcome message when new user registers

  return (
    <div className='container'>
      <form
        className='register_form center_cont'
        onSubmit={(e) => {registerUser(e)}}>

        <input
          className='text_focus center_cont'
          placeholder='Email'
          required id="email" type='text'
          value={email} name='email'
          onChange={e => setEmail(e.target.value)}
        />


        <input
          className='text_focus center_cont'
          placeholder="Username"
          required id="username" type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />


        <input
          className='text_focus center_cont'
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
