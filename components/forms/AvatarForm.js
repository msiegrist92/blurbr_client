import axios from 'axios';
import React, { useState } from 'react';

const AvatarForm = () => {

  //process.env.NEXT_PUBLIC_DEV_API + '/user/' + "5fb4082408eb0123095db14e" + '/avatar'

  const [file, setFile] = useState();

  const uploadAvatar = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file);
    //replace ID with sessionStorage .token(decoded with secret)
    //or just allow user access to their ID in the client - is that safe?
    axios.post(process.env.NEXT_PUBLIC_DEV_API +
        '/user/' + "5fb4082408eb0123095db14e" + '/avatar', data,
      {
        headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <form onSubmit={(e) => uploadAvatar(e)}
        encType='multipart/form-data'
        accept='image/jpeg'
      >
        <input id='file' required
          type='file' name='avatar'
          onChange={(event) => setFile(event.target.files[0])}
        />
        <input type='submit' />
      </form>
    </div>
  )
}

export default AvatarForm;
