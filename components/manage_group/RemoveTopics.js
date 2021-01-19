import React, {useState} from 'react';
import axios from 'axios';

import RemoveTopicItem from './RemoveTopicItem';

const RemoveTopics = ({group_data}) => {

  const {topics} = group_data;

  const [selections, setSelections] = useState([])

  const removeTopics = (e, selections) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + '/groupmgmt/removetopics', {
      user_token: sessionStorage.token,
      selections,
      group_id: group_data._id
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
  }


  const remove_list = topics.map((topic) => {
    return <RemoveTopicItem topic={topic} key={topic._id} selections={selections} setSelections={setSelections}/>
  })

  return (
    <>
      <form className='purple_form center_cont two_col_70_30'
        onSubmit={(e) => {removeTopics(e, selections)}}
        >
        <h2 className='self_center'>Topic</h2>
        <h2 style={{marginTop: '0'}}className='self_center'>Remove</h2>
        <ul className='span_two_col'>
          {remove_list}
        </ul>
        <input value="Remove" className='center_cont span_two_col' type='submit' />
      </form>
    </>
  )
}

export default RemoveTopics;
