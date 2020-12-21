import React, {useState} from 'react';
import axios from 'axios';

const LoginForm = ({toggle, show, session}) => {

  console.log(toggle, show)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const loginUser = (e, email, password) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/user/login', {
      email,
      password
    }).then((res) => {
      sessionStorage.setItem('token', res.data.token);
      setSession(true)
      toggle(e, show);

    }).catch((err) => {
      setStatus(err.response)
    })
  }

  return (
    <div className='container'>
      <form
        className='register_form center_cont'
        onSubmit={(e) => {loginUser(e, email, password)}}>

        <input required type='email'
          value={email}
          id="email" name='email'
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          className='center_cont text_focus'
        />

        <input required type='password'
            value={password}
            id='password' name='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            className='center_cont text_focus'
            />

        <input
          className='center_cont'
          value="Log In"
          type='submit' />

        </form>
      <h2 className='center_text'>{status}</h2>
    </div>
  )
}

export default LoginForm;
