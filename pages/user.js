import axios from 'axios';
import React, { useState } from 'react';

const User = () => {

  //process.env.NEXT_PUBLIC_DEV_API + '/user/' + "5fb4082408eb0123095db14e" + '/avatar'

  const [file, setFile] = useState();

  const uploadAvatar = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file);
    console.log(file)
    console.log(data)
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/user/' + "5fb4082408eb0123095db14e" + '/avatar', data,
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
      <form onSubmit={(e) => uploadAvatar(e)} encType='multipart/form-data' >
        <input id='file' required
          type='file' name='avatar'
          onChange={(event) => setFile(event.target.files[0])}
        />
        <input type='submit' />
      </form>
    </div>
  )
}

export default User;
