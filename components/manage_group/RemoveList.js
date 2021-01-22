import React, {useState} from 'react';
import axios from 'axios';
import {genUsers, genTopics} from '../../lib/utils/genRemoveList';

const RemoveList = ({group_id, dataset, removerFunc, title, list_type}) => {

  const [selections, setSelections] = useState([]);

  let remove_list;

  if(list_type === 'topic'){
    remove_list = genTopics(dataset, selections, setSelections);
  }

  if(list_type === 'user'){
    remove_list = genUsers(dataset, selections, setSelections);
  }

  return (
    <>
    <form
      style={{gap: '0'}}
      className='purple_form center_cont two_col_70_30'
      onSubmit={(e) => {removerFunc(e, selections, group_id)}}
      >
      <h2 className='self_center'>{title}</h2>
      <h2 style={{marginTop: '0'}}className='center_cont self_center'>Remove</h2>
      <ul className='span_two_col'>
        {remove_list}
      </ul>
      <input value="Remove" className='center_cont span_two_col' type='submit' />
    </form>
    </>
  )
}

export default RemoveList;
