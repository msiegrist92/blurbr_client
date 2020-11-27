import axios from 'axios';

const getTopicById = id => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/topic/' + id)
    .then((res) => {
      return res.data
    }).catch((err) => {
      console.log(err);
    })
}

export default getTopicById;
