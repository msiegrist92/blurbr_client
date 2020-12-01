import React, {useState, useEffect} from 'react';
import TopicListUser from '../topics/TopicListUser';
import Head from 'next/head';

const UserInfo = ({username, avatar, signature, number_posts, topics}) => {

  avatar = process.env.NEXT_PUBLIC_AVATAR_DIR + avatar;
  number_posts = 'Posts: ' + number_posts;

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (display === false){
      console.log('false')
    } else {
      console.log('true')
    }
  }, [display])

  const dropTopics = (e, display) => {
    e.preventDefault();
    if (display === false){
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }

  const topics_list = topics.map((topic) => {
    return <TopicListUser key={topic._id} topic={topic} />
  })

  return (
    <div className='user_info container'>
      <Head>
        <title>Blurbr User {username}</title>
      </Head>
      <h1 className='username'>{username}</h1>
      <img src={avatar}></img>
      <p>{signature}</p>
      <h4 className='number_posts'>{number_posts}</h4>
      <h1 className='topics'>
        Topics<i
        onClick={(e) => {dropTopics(e, display)}}
        className='caret down icon'></i>
    </h1>
      {topics_list.length > 0 &&
        <ul className='topics_list'>
          {topics_list}
        </ul>
      }
      {topics_list.length === 0 &&
        <h4 className='topics_list'>User has not created any topics</h4>
      }
    </div>
  )
}

export default UserInfo;
