import axios from 'axios';
import React, { useState } from 'react';

const User = () => {

  return (
    <div>
      <form onSubmit={(e) => uploadAvatar(e)} enctype='multipart/form-data'>
        <input type='file' name='avatar'/>
      </form>
    </div>
  )
}

export default User;
