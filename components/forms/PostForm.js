import React, {useState} from 'react';
import axios from 'axios';

const PostForm = (props) => {

  const [body, setBody] = useState('');
  const [status, setStatus] = useState('')

  const makePost = (event, body) => {
    event.preventDefault();
    if(!sessionStorage.token){
      return setStatus('Please log in to respond to topics')
    }
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/posts/' + props.id, {
      body,
      id: props.id,
      token: sessionStorage.token
    }).then((res) => {
      console.log(res)
      setStatus('Post created!');
    }).catch((err) => {
      console.log(err);
    })

  }


  return (
    <div>
      <form onSubmit={(e) => {makePost(e, body)}}>
        <label>Post to this topic</label>
        <textarea
          style={{resize:'none'}}
          value={body}
          onChange={(e) => {setBody(e.target.value)}}
        />
        <input type='submit' />
      </form>
      <h2>{status}</h2>
    </div>
  )
}

export default PostForm;
