import React, {useState, useEffect} from 'react';
import axios from 'axios';

const TopicForm = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createTopic = (e, title, body) => {
    e.preventDefault();
    console.log('nothanks')
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
