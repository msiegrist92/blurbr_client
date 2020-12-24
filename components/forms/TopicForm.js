import React, {useState, useEffect} from 'react';
import axios from 'axios';

const TopicForm = ({user, groups}) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [group, setGroup] = useState('');
  const [status, setStatus] = useState('');

  const user_groups = groups.map((group) => {
    return (
      <option
        name='group' value={group._id} key={group._id}
        >
          {group.name}
      </option>
    )
  })

  const createTopic = (e, title, body, group) => {
    if(group === ''){
      group = groups[0]._id
    }
    e.preventDefault();
    if(!sessionStorage.token){
      return setStatus('Please log in to create new topics')
    }
    console.log(group);
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/topic', {
      group,
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
    <div className='topic_form'>
      <form onSubmit={(e) => {createTopic(e, title, body, group)}}>
        <label htmlFor='groups'>Groups</label>
        <select
          onChange={(e) => {
            console.log('clicky')
            console.log(e.target.value);
            setGroup(e.target.value)}}
          name='groups' required id='groups'
          value={group}
          >
          {user_groups}
        </select>

        <label htmlFor='title'>Title</label>
        <input
          type='text' required id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      <h2 className='center_text'>Body</h2>
      <textarea required id="body"
          rows='6'
          cols='50'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          className='big_button'
          type='submit' />
      </form>
      <h2 className='center_text'>{status}</h2>
    </div>
  )
}

export default TopicForm;
