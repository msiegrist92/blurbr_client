import axios from 'axios';

const removeUsers = (e, selections, group_id) => {
  e.preventDefault();
  axios.post(process.env.NEXT_PUBLIC_DEV_API + '/groupmgmt/removeusers', {
    token: sessionStorage.token,
    user_token: sessionStorage.token,
    group_id,
    selections
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err);
  })
}

const removeTopics = (e, selections, group_id) => {
  e.preventDefault();
  axios.post(process.env.NEXT_PUBLIC_DEV_API + '/groupmgmt/removetopics', {
    token: sessionStorage.token,
    user_token: sessionStorage.token,
    selections,
    group_id
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err);
  })
}

module.exports = {
  removeUsers,
  removeTopics
}
