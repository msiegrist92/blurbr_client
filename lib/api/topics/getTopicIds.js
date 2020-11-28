import axios from 'axios';

const getTopicIds = () => {
  return axios.get(process.env.NEXT_PUBLIC_DEV_API + '/topic')
  .then((res) => {
    const ids = res.data.map((topic) => {
      return {
        params : {
          id : topic._id
        }
      }
    })
    return ids;
  }).catch((err) => {
    console.log(err);
  })
}

export default getTopicIds;
