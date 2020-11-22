import React, {useState} from 'react';

const RegisterUser = () => {

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  const registerUser = e => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/user/register', {
      email,
      password,
      username,
      //remove signature when recreating database
      signature: 'this is a temp signature'
    }).then((res) => {
      //on success redirect user to customize with signature and avatar
      console.log(res);
    }).catch((e) => {
      console.log(e);
    })
  }


  return (
    <div>
      <form onSubmit={(e) => {registerUser(e)}}>

        <label htmlFor='email'>Email</label>
        <input
          required id="email" type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor='username'>Username</label>
        <input
          required id="username" type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />

        <label htmlFor='password'>Password</label>
        <input required id="password" type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />

        <input type='submit' />

      </form>
    </div>
  )
}

export default RegisterUser;
