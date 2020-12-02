//handle errors from post or get endpoints where pages has state session and status

const handleSessionErr = (err, setStatus, setSession) => {
  setStatus(err.response.data);
  if(err.response.status === 401){
    setSession(false);
  }
}

export default handleSessionErr;
