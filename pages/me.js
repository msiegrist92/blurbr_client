import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import AvatarForm from '../components/forms/AvatarForm';
import SigForm from '../components/forms/SigForm';
import UserInfo from '../components/user/UserInfo';
import Header from '../components/Header';
import TopicsDropDown from '../components/user/TopicsDropDown';

import getAvatar from '../lib/api/user/getAvatar';
import getSig from '../lib/api/user/getSig';
import getUserById from '../lib/api/user/getUserById';
import handleSessionErr from '../lib/utils/handleSessionErr';


const Me = () => {

  const [avatar, setAvatar] = useState('');
  const [sig, setSig] = useState('');
  const [DBSig, setDBSig] = useState('');
  const [DBAvatar, setDBAvatar] = useState('');

  const [userID, setUserID] = useState('');
  const [session, setSession] = useState(true);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
    if(!sessionStorage.token){
      return setSession(false);
    }
    getUserById(jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id).then((res) => {
      setUser(res.data);
    })
  }, [])


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
        handleSessionErr(err, setStatus, setSession);
      })
  }


  const uploadAvatar = (event, avatar) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", avatar);
    data.append('token', sessionStorage.token)
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
      handleSessionErr(err, setStatus, setSession);
    })
  }



  return (
    <div>
      <Header />
      {!session &&
        <h1>Please Log In</h1>
      }
      {session &&
        <div>
          {user &&
            <>
            <UserInfo username={user.username} avatar={DBAvatar}
              signature={DBSig} number_posts={user.number_posts}
            />
            <AvatarForm
              setAvatar={setAvatar}
              uploadAvatar={uploadAvatar}
              img={avatar}
             />
            <SigForm
              updateSig={setSig}
              changeSig={changeSig}
              sig={sig}/>
            <TopicsDropDown topics={user.topics} />
          </>
          }
          <h2>{status}</h2>
        </div>
      }
    </div>
  )
}



export default Me;
