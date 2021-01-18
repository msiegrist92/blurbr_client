import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';

import SessionProtectPage from '../components/SessionProtectPage';

import AvatarForm from '../components/forms/AvatarForm';
import SigForm from '../components/forms/SigForm';
import UserInfo from '../components/user/UserInfo';

import genListIfUser from '../lib/utils/genListIfUser';
import CaretTurnDropDown from '../components/utils/CaretTurnDropDown';


import getAvatar from '../lib/api/user/getAvatar';
import getSig from '../lib/api/user/getSig';
import getUserById from '../lib/api/user/getUserById';
import handleSessionErr from '../lib/utils/handleSessionErr';
import {animateToggle, animateToggleDisplayTimeOut} from '../lib/utils/animationHandler';

import checkToken from '../lib/utils/checkToken';


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
    setSession(checkToken(sessionStorage.token));
  })


  useEffect(() => {
    getUserById(jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id).then((res) => {
      setUser(res.data);
    })
  }, [session])


  useEffect(() => {
      let id = jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)
      setUserID(id._id);
      getAvatar(userID).then((res) => {
        setDBAvatar(res);
      })
      getSig(userID).then((res) => {
        setDBSig(res);
      })
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

  const animationControl = (e, [...ids], outClass, inClass, length, display ) => {
    e.preventDefault();
    for(let id of ids){
      animateToggle(document.getElementById(id), outClass, inClass, length, display)
    }
  }

  let topics_list = genListIfUser(user, 'topic');
  let groups_list = genListIfUser(user, 'group');

  console.log(user)

  return (
    <>
      <SessionProtectPage page_title='Your Profile' no_session_title='Please log in to mange your profile'
        session={session}>

          {user &&
            <>

            <UserInfo username={user.username} avatar={DBAvatar}
              signature={DBSig} number_posts={user.number_posts}
            />

            <div id='me_form_cont'>

              <SigForm
                status={status}
                updateSig={setSig}
                changeSig={changeSig}
                sig={sig}
                showForm={animationControl}
              />

              <AvatarForm
                status={status}
                setAvatar={setAvatar}
                uploadAvatar={uploadAvatar}
                img={avatar}
                showForm={animationControl}
              />

            </div>

          <div className='drops_cont'>

            <CaretTurnDropDown
              col={'1'} list={topics_list} class_name={'topics_list'}
                list_name={"Topics"} h1_class={'topics'}
            />

            <CaretTurnDropDown list={groups_list} class_name={'groups_list'}
                col={'2'} list_name={'Groups'} h1_class={'groups'}
            />

          </div>
          </>
          }
      </SessionProtectPage>
    </>
  )
}



export default Me;
