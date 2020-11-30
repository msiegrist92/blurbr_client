import React from 'react';
import TopicListUser from '../topics/TopicListUser';
import Head from 'next/head';

const UserInfo = ({username, avatar, signature, number_posts, topics}) => {

  avatar = process.env.NEXT_PUBLIC_AVATAR_DIR + avatar;
  number_posts = 'Posts: ' + number_posts;

  console.log(topics);
  const topics_list = topics.map((topic) => {
    return <TopicListUser topic={topic} />
  })

  return (
    <div>
      <Head>
        <title>Blurbr User {username}</title>
      </Head>
      <h1>{username}</h1>
      <img src={avatar}></img>
      <p>{signature}</p>
      <h4>{number_posts}</h4>
      <h1>Topics</h1>
      {topics_list.length > 0 &&
        <ul>
          {topics_list}
        </ul>
      }
      {topics_list.length === 0 &&
        <h4>User has not created any topics</h4>
      }
    </div>
  )
}

export default UserInfo;
