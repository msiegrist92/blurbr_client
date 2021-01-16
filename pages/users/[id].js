import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head'

import checkToken from '../../lib/utils/checkToken';

import UserInfo from '../../components/user/UserInfo';
import Header from '../../components/global/Header';
import TopicListDropDown from '../../components/topics/TopicListDropDown';
import CaretTurnDropDown from '../../components/utils/CaretTurnDropDown';
import GroupListDropDown from '../../components/groups/GroupListDropDown';
import NoSessionLock from '../../components/utils/NoSessionLock';

import {getIds, getDocById} from '../../lib/api/dynamicRouting';

const Page = (props) => {

  const [token, setToken] = useState(false);
  const [session, setSession] = useState(false)

  useEffect(() => {
    setSession(checkToken(sessionStorage.token));
  }, [])

  const {username, avatar, signature, number_posts} = props.user;
  const topics = props.user.topics;
  const groups = props.user.groups;

  const topics_list = topics.map((topic) => {
    return <TopicListDropDown key={topic._id} topic={topic} />
  })

  const groups_list = groups.map((group) => {
    return <GroupListDropDown key={group._id} group={group} />
  })


  return (
    <>
      <Head>
        <title>Blurbr - {username}</title>
      </Head>
      <Header />

        {!session &&
          <NoSessionLock>
            <h3 className='center_text'>Please log in or register to view user profiles</h3>
          </NoSessionLock>
        }.

        {session &&
          <>
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
          </>
        }
      </>
  )
}


export async function getStaticProps({params}){
  console.log(params.id)
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
