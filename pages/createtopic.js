import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopicForm from '../components/forms/TopicForm';
import Header from './Header';

const CreateTopic = () => {

  return (
    <div>
      <Header />
      <TopicForm />
    </div>
  )
}

export default CreateTopic;
