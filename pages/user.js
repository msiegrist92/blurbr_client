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

  const uploadAvatar = (event, avatar) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", avatar);
    //replace ID with sessionStorage .token(decoded with secret)
    //or just allow user access to their ID in the client - is that safe?
    axios.post(process.env.NEXT_PUBLIC_DEV_API +
        '/user/' + "5fb4082408eb0123095db14e" + '/avatar', data,
      {
        headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      setDBAvatar(res.data.avatar);
    }).catch((err) => {
      console.log(err);
    })
  }


  return (
    <div>
      <AvatarInfo img_src={DBAvatar} />
      <AvatarForm
        setAvatar={setAvatar}
        uploadAvatar={uploadAvatar}
        img={avatar}
       />
      <SigInfo sig={DBSig}/>
      <SigForm
        updateSig={setSig}
        changeSig={changeSig}
        sig={sig}/>
    </div>
  )
}



export default User;
