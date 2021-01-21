import React, {useState, useEffect} from 'react';
import axios from 'axios';

import checkToken from '../../lib/utils/checkToken';
import {genListIfUser} from '../../lib/utils/genListIfUser';
import {getIds, getDocById} from '../../lib/api/dynamicRouting';

import UserInfo from '../../components/user/UserInfo';
import CaretTurnDropDown from '../../components/utils/CaretTurnDropDown';
import SessionProtectPage from '../../components/SessionProtectPage';

const Page = (props) => {

  const {username, avatar, signature, number_posts, topics, groups} = props.user;
  const {user} = props;
  const page_title = `Blurbr - ${username}`;

  const [token, setToken] = useState(false);
  const [session, setSession] = useState(false)

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  }, [])

  const topics_list = genListIfUser(user, 'topic');

  const groups_list = genListIfUser(user, 'group');

  return (


          <>
          <SessionProtectPage page_title={page_title} no_session_title="Please log in to view profiles"
              session={session}>

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
