import axios from 'axios';
import React, { useState } from 'react';

import {animateToggle, animateToggleDisplayTimeOut} from '../../lib/utils/animationHandler';


const AvatarForm = (props) => {

  const [pressed, setPressed] = useState(false);

  return (
    <div id='avatar_form'>
      <form onSubmit={(e) => props.uploadAvatar(e, props.img)}
        encType='multipart/form-data'
        accept='image/jpeg'
      >
      <button
        disabled={pressed}
        className='clickable'
        onClick={(e) => {
          props.showForm(e, ['avatar_input'], 'off_right',
            'absolute_avatar', 1000, 'block')
          setPressed(true)}}
        >
        Change Your Avatar</button>
      <div id='avatar_input'
        className='off_right'>
        <input id='file' required
          className='text_focus'
          type='file' name='avatar'
          accept='image/jpeg'
          onChange={(event) => props.setAvatar(event.target.files[0])}
        />
        <input
          id='sub_file'
          type='submit'
        />
      <p>{props.status}</p>
      </div>
      </form>
    </div>
  )
}

export default AvatarForm;
