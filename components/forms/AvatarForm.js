import axios from 'axios';
import React, { useState } from 'react';

const AvatarForm = (props) => {

  //process.env.NEXT_PUBLIC_DEV_API + '/user/' + "5fb4082408eb0123095db14e" + '/avatar'

  return (
    <div>
      <form onSubmit={(e) => props.uploadAvatar(e, props.img)}
        encType='multipart/form-data'
        accept='image/jpeg'
      >
        <input id='file' required
          type='file' name='avatar'
          onChange={(event) => props.setAvatar(event.target.files[0])}
        />
        <input type='submit' />
      </form>
    </div>
  )
}

export default AvatarForm;
