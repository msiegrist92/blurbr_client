import React from 'react';
import getAvatar from '../../lib/api/user/getAvatar';

const AvatarInfo = (props) => {


  return (
    <div>
      <div>Hello</div>
      <img src={process.env.NEXT_PUBLIC_AVATAR_DIR + props.img_src}></img>
    </div>
  )
}

export default AvatarInfo;
