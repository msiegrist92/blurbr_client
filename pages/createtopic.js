import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopicForm from '../components/forms/TopicForm';
import Header from '../components/Header';

const CreateTopic = () => {

  const [session, setSession] = useState(true);

  useEffect(() => {
    if(!sessionStorage.token){
      return setSession(false)
    }
  })

  return (
    <div>
      <Header />
      {session &&
        <TopicForm />
      }
    </div>
  )
}

export default CreateTopic;
