import axios from 'axios';

const getUserById = (id, token) => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/user/' + id,
  {
    headers: {
      'Authorization': token
    }
  })
    .then((res) => {
      return res
    }).catch((err) => {
      console.log(err);
    })
}

export default getUserById;
