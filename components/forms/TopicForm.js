import React, {useState, useEffect} from 'react';
import axios from 'axios';

const TopicForm = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');

  //useeffect hook to check that a user is logged in
  //hide submit button?

  const createTopic = (e, title, body) => {
    e.preventDefault();
    if(!sessionStorage.token){
      return setStatus('Please log in to create new topics')
    }
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/topic', {
      title,
      body,
      token: sessionStorage.token
    }).then((res) => {
      setStatus('Topic created!')
    }).catch((err) => {
      setStatus(err.response.data);
    })
  }

  return (
    <div>
      <form onSubmit={(e) => {createTopic(e, title, body)}}>
        <label htmlFor='title'>Post Title</label>
        <input
          type='text' required id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='body'>Body</label>
        <input
          type='text' required id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input type='submit' />
      </form>
      <h2>{status}</h2>
    </div>
  )
}

export default TopicForm;
