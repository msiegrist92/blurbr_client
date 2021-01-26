import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import checkToken from '../../lib/utils/checkToken';
import {checkIsYou} from '../../lib/utils/rolesCheck';
import {genListIfUser} from '../../lib/utils/genListIfUser';
import {getIds, getDocById} from '../../lib/api/dynamicRouting';

import UserInfo from '../../components/user/UserInfo';
import CaretTurnDropDown from '../../components/utils/CaretTurnDropDown';
import SessionProtectPage from '../../components/SessionProtectPage';
import Modal from '../../components/utils/Modal';
import SearchUser from '../../components/search_user/SearchUser';

const Page = (props) => {

  const {username, avatar, signature, number_posts, topics, groups} = props.user;
  const {user} = props;
  const page_title = `Blurbr - ${username}`;

  const [token, setToken] = useState(false);
  const [session, setSession] = useState(false)
  const [isYou, setYou] = useState(false);
  const [modal, setModal] = useState(false);
  const [invite_groups, setInviteGroups] = useState([]);

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal){
      setModal(false);
    } else {
      setModal(true);
    }
  }


  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
    setYou(checkIsYou(user._id, sessionStorage.token));
  }, [])

  useEffect(() => {
    if(session && !isYou){
      const session_user = jwt.verify(sessionStorage.token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
      axios.get(`${process.env.NEXT_PUBLIC_DEV_API}/user_groups/${session_user}`, {
        headers : {
          'Authorization': sessionStorage.token
        }
      })
        .then((res) => {
          setInviteGroups(res.data);
        }).catch((err) => {
          console.log(err);
        })
    }
  }, [session])

  console.log(invite_groups);

  const topics_list = genListIfUser(user, 'topic');

  const groups_list = genListIfUser(user, 'group');

  return (


          <>
          <SessionProtectPage page_title={page_title} no_session_title="Please log in to view profiles"
              session={session}>

            {!isYou &&
              <button
                style={{margin: '5px 0 5px 5px'}}
                className='call_to'
                onClick={(e, modal) => {
                  toggleModal(e, modal)
                }}>
                  Invite To Group
                </button>
            }

            <UserInfo
              username={username} avatar={avatar} signature={signature}
              number_posts={number_posts} topics={topics}
            />

            <div className='drops_cont'>

              <CaretTurnDropDown list={topics_list} class_name={'topics_list'}
                list_name={'Topics'} h1_class={'topics'}
              />

              <CaretTurnDropDown list={groups_list} class_name={'groups_list'}
                  list_name={'Groups'} h1_class={'groups'}
              />
            </div>

            <Modal show={modal} toggle={toggleModal}>
              <SearchUser groups={invite_groups} default_term={username}/>
            </Modal>

          </SessionProtectPage>
        </>

  )
}


export async function getStaticProps({params}){
  return {
    props : {
      user: await getDocById(process.env.NEXT_PUBLIC_DEV_API + '/user/', params.id).then((res) => {
        return res
      })
    }
  }
}

export async function getStaticPaths(){
  return {
    paths: await getIds(process.env.NEXT_PUBLIC_DEV_API + '/users', '_id').then((res) => {
      return res
    }),
    fallback: false
  }
}

export default Page;
