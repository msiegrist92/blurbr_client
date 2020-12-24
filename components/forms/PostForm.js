import React, {useState} from 'react';
import axios from 'axios';

const PostForm = ({id, show, toggle}) => {

  const [body, setBody] = useState('');
  const [status, setStatus] = useState('')

  const makePost = (event, body) => {
    event.preventDefault();
    if(!sessionStorage.token){
      return setStatus('Please log in to respond to topics')
    }
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/posts/' + id, {
      body,
      id,
      token: sessionStorage.token
    }).then((res) => {
      console.log(res.status.data)
      if(res.status === 201){
        toggle(event, show);
      }
      if (res.status == []){
        //can we add another arg to this function to display you are not in a group
        alert('You must join a group to make a post ')
      }
    }).catch((err) => {
      console.log(err);
    })

  }


  return (
    <div className='container'>
      <form className='post_form' onSubmit={(e) => {makePost(e, body)}}>
        <label className='center_text'>Post to this topic</label>
        <textarea
          required
          rows='8'
          cols='50'
          style={{resize:'none'}}
          value={body}
          onChange={(e) => {setBody(e.target.value)}}
        />
        <input type='submit' />
      </form>
    </div>
  )
}

export default PostForm;
