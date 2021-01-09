import jwt from 'jsonwebtoken';

const checkOwner = (token, group_owner) => {
  const user_id = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
  return user_id === group_owner
}

export default checkOwner;
