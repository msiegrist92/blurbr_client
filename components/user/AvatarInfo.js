import React from 'react';
import getAvatar from '../../lib/api/user/getAvatar';

const AvatarInfo = (props) => {


  return (
    <div>
      <h2>Current Avatar</h2>
      <img src={process.env.NEXT_PUBLIC_AVATAR_DIR + props.img_src}></img>
    </div>
  )
}

export default AvatarInfo;
