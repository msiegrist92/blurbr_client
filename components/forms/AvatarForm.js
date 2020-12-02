import axios from 'axios';
import React, { useState } from 'react';

import {animateToggle, animateToggleDisplayTimeOut} from '../../lib/utils/animationHandler';


const AvatarForm = (props) => {

  //process.env.NEXT_PUBLIC_DEV_API + '/user/' + "5fb4082408eb0123095db14e" + '/avatar'

  const showForm = e =>{
    e.preventDefault();
    const file = document.getElementById('file');
    const sub_file = document.getElementById('sub_file');
    animateToggle(file, 'off_right', 'relative', 2000, 'block');
    animateToggle(sub_file, 'off_right', 'relative', 2000, 'block');
  }

  return (
    <div id='avatar_form'>
      <form onSubmit={(e) => props.uploadAvatar(e, props.img)}
        encType='multipart/form-data'
        accept='image/jpeg'
      >
      <h2 onClick={(e) => {showForm(e)}}>Change Your Avatar</h2>
        <input id='file' required
          type='file' name='avatar'
          accept='image/jpeg'
          onChange={(event) => props.setAvatar(event.target.files[0])}
          className='off_right'
        />
      <input id='sub_file' type='submit'
          className='off_right'
          />
      </form>
    </div>
  )
}

export default AvatarForm;
