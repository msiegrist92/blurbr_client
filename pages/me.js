import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';

import AvatarForm from '../components/forms/AvatarForm';
import AvatarInfo from '../components/user/AvatarInfo';
import SigInfo from '../components/user/SigInfo';
import SigForm from '../components/forms/SigForm';

import getAvatar from '../lib/api/user/getAvatar';
import getSig from '../lib/api/user/getSig';



const Me = () => {

  const [avatar, setAvatar] = useState('');
  const [sig, setSig] = useState('');
  const [DBSig, setDBSig] = useState('');
  const [DBAvatar, setDBAvatar] = useState('');
  const [userID, setUserID] = useState('');
  const [session, setSession] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if(!sessionStorage.token){
      return setSession(false);
    } else {
      let id = jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET);
      setUserID(id._id);
      getAvatar(userID).then((res) => {
        setDBAvatar(res);
      })
      getSig(userID).then((res) => {
        setDBSig(res);
      })
    }
  }, [DBSig, DBAvatar])

  const changeSig = (event, sig) => {
    event.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/user/' +
      userID + '/signature',
      {
        signature: sig,
        token: sessionStorage.token
      }).then((res) => {
        setStatus('Signature changed!');
        setDBSig(res.data);
      }).catch((err) => {
        setStatus(err.response.data);
        if(err.response.status === 401){
          setSession(false);
        }
      })
  }

  const uploadAvatar = (event, avatar) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", avatar);
    data.append('token', sessionStorage.token)
    //replace ID with sessionStorage .token(decoded with secret)
    //or just allow user access to their ID in the client - is that safe?
    axios.post(process.env.NEXT_PUBLIC_DEV_API +
        '/user/' + userID + '/avatar', data,
      {
        headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      setStatus('Avatar changed!');
      setDBAvatar(res.data.avatar);
    }).catch((err) => {
      setStatus(err.response.data)
      if(err.response.status === 401){
        setSession(false);
      }
    })
  }


  return (
    <div>
      {!session &&
        <h1>Please Log In</h1>
      }
      {session &&
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
            <h2>{status}</h2>
        </div>
      }
    </div>
  )
}



export default Me;;
