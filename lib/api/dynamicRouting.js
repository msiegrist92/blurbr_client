import axios from 'axios';

const getIds = (api_route, id_field) => {
  return axios.get(api_route).then((res) => {
    const ids = res.data.map((doc) => {
      console.log(doc[id_field])
      return {
        params : {
          id : doc[id_field]
        }
      }
    })
    return ids;
  }).catch((err) => {
    console.log(err)
  })
}

//must know configuration of API route and params to use this
const getDocById = (api_route, id) => {
  return axios.get(api_route + id).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err);
  })
}

module.exports = {
  getIds : getIds,
  getDocById: getDocById
}
