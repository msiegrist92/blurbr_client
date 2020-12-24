const checkToken = (token) => {
  if(!token || token === null){
    return false;
  } else {
    return true;
  }
}

export default checkToken;
