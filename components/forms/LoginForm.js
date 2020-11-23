import React, {useState} from 'react';
import axios from 'axios';

const Login = () => {
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
      setStatus('Login successful!');
    }).catch((err) => {
      setStatus(err.response.data)
    })
  }

  return (
    <div>
      <form onSubmit={(e) => {loginUser(e, email, password)}}>
        <label htmlFor='email'>Email</label>
        <input required type='email'
          value={email}
          id="email" name='email'
          onChange={e => setEmail(e.target.value)}
        />
      <label htmlFor='password'>Password</label>
      <input required type='password'
          value={password}
          id='password' name='password'
          onChange={e => setPassword(e.target.value)}
        />
      <input type='submit' />
      </form>
      <h2>{status}</h2>
    </div>
  )
}

export default Login;
