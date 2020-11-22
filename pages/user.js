import axios from 'axios';
import React, { useState, useEffect } from 'react';

import AvatarForm from '../components/forms/AvatarForm';
import AvatarInfo from '../components/user/AvatarInfo';
import SigInfo from '../components/user/SigInfo';
import SigForm from '../components/forms/SigForm';

import getAvatar from '../lib/api/user/getAvatar';
import getSig from '../lib/api/user/getSig';



const User = () => {

  const [avatar, setAvatar] = useState('');
  const [sig, setSig] = useState('');
  const [DBSig, setDBSig] = useState('');
  const [DBAvatar, setDBAvatar] = useState('');

  useEffect(() => {
    getAvatar("5fb4082408eb0123095db14e").then((res) => {
      setDBAvatar(res);
    })
    getSig("5fb4082408eb0123095db14e").then((res) => {
      setDBSig(res);
    })
  }, [])

  const changeSig = (event, sig) => {
    event.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/user/' +
      "5fb4082408eb0123095db14e" + '/signature',
      {
        signature: sig
      }).then((res) => {
        setDBSig(res.data);
      }).catch((e) => {
        console.log(e);
      })
  }

  return (
    <div>
      <AvatarInfo img_src={DBAvatar} />
      <AvatarForm />
      <SigInfo sig={DBSig}/>
      <SigForm
        updateSig={setSig}
        changeSig={changeSig}
        sig={sig}/>
    </div>
  )
}



export default User;
