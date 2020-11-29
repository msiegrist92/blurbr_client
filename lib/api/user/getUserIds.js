import axios from 'axios';

const getUserIds = () => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/users/paths')
  .then((res) => {
    return res;
  }).catch((err) => {
    console.log(err);
  })
}

export default getUserIds;
