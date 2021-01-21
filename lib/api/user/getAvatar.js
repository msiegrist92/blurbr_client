import axios from 'axios';

const getAvatar = (id, token) => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/user/' + id,
  {
    headers : {
      'Authorization': token
    }
  })
  .then((res) => {
    const avatar = res.data.avatar;
    console.log(avatar)
    return avatar;
  }).catch((err) => {
    console.log(err);
  })
}

export default getAvatar;
