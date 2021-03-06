import React, {useState, useEffect} from 'react';
import axios from 'axios';

const TopicForm = ({groups}) => {

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
    e.preventDefault();
    if(group === ''){
      group = groups[0]._id
    }
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/topic', {
      group,
      title,
      body,
      token: sessionStorage.token
    }).then((res) => {
      setStatus('Topic created!')
    }).catch((err) => {
      setStatus('Internal server error please try again later');
    })
  }

  return (
    <div className='topic_form'>
      <form onSubmit={(e) => {createTopic(e, title, body, group)}}>
        <label htmlFor='groups'>Post To</label>

        <select
          onChange={(e) => {
            setGroup(e.target.value)}
          }
          name='groups' required id='groups'
          value={group}
          >
          {user_groups}
        </select>

        <input
          placeholder='Title'
          className='text_focus center_cont'
          type='text' required id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      <h3 className='center_text'>Body</h3>
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
