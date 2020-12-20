import React, {useState} from 'react';
import axios from 'axios';

const CreateGroup = ({modal, toggleModal}) => {

  const [name, setName] = useState('');

  const postGroup = e => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/group', {
      name,
      token: sessionStorage.token
    }).then((res) => {
      toggleModal(e, modal);
    }).catch((e) => {
      alert(e);
    })
  }

  return (
    <div className='container'>

      <form
        className='register_form center_cont'
        onSubmit={(e) => postGroup(e)}
        >

        <input
          className='center_cont text_focus'
          placeholder='Group Name'
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className='center_cont'
          type='submit' value='Create Group' />

      </form>
    </div>
  )
}

export default CreateGroup;
