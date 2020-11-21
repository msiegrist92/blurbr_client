import axios from 'axios';
import React, { useState } from 'react';
import AvatarForm from '../components/forms/AvatarForm';
import AvatarInfo from '../components/user/AvatarInfo';
import getAvatar from '../lib/api/user/getAvatar';

const User = ({img_src}) => {

  return (
    <div>
      <AvatarInfo img_src={img_src} />
      <AvatarForm />
    </div>
  )
}

export async function getStaticProps(){

  const img_src = await getAvatar("5fb4082408eb0123095db14e");
  console.log(img_src);
  return {
    props: {
      img_src
    }
  }
}

export default User;
