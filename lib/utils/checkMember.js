import jwt from 'jsonwebtoken';

const checkMember = (member_list, token) => {
  const user_id = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)._id;
  console.log(user_id, member_list)
  return member_list.includes(user_id);
}

export default checkMember;
