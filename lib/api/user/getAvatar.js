import axios from 'axios';

const getAvatar = id => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/user/' + id)
  .then((res) => {
    const avatar = res.data.avatar;
    return avatar;
  }).catch((err) => {
    console.log(err);
  })
}

export default getAvatar;
