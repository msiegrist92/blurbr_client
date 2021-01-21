import axios from 'axios';

const getSig = (id, token) => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/user/' + id,
  {
    headers: {
      'Authorization': token
    }
  })
  .then((res) => {
    const sig = res.data.signature;
    return sig;
  }).catch((err) => {
    console.log(err);
  })
}

  export default getSig;
