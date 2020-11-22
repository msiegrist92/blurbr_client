import axios from 'axios';

const getSig = id => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/user/' + id)
  .then((res) => {
    const sig = res.data.signature;
    return sig;
  }).catch((err) => {
    console.log(err);
  })
}

  export default getSig;
