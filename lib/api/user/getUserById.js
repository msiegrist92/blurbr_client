import axios from 'axios';

const getUserById = id => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/user/' + id)
    .then((res) => {
      return res
    }).catch((err) => {
      console.log(err);
    })
}

export default getUserById;
