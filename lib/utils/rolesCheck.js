import jwt from 'jsonwebtoken';

const checkIsYou = (user_id, token) => {
  const session_user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
  return session_user === user_id;
}


module.exports = {
  checkIsYou
}
