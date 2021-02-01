import jwt from 'jsonwebtoken';

const checkIsYou = (user_id, token) => {
  const session_user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
  return session_user === user_id;
}

const checkMember = (member_list, token) => {
  const user_id = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
  console.log(user_id, member_list)
  return member_list.includes(user_id);
}

const checkOwner = (token, group_owner) => {
  const user_id = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
  return user_id === group_owner
}

const checkToken = (token) => {
  if(!token || token === null){
    return false;
  } else {
    return true;
  }
}



module.exports = {
  checkIsYou,
  checkMember,
  checkOwner,
  checkToken
}
