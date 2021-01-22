import React from 'react';

const RemoveTopicItem = ({topic, selections, setSelections}) => {
  const topic_link = `/topics/${topic._id}`;

  let body = topic.body;
  if(body.length > 70){
    body.length = 60;
    body += '...';
  }

  const toggleSelection = (e, selections) => {
    let copy = [...selections];
    if(copy.includes(e.target.value)){
      copy = copy.filter((item) => {
        return item !== e.target.value
      })
    } else {
      copy = [...copy, e.target.value]
    }
    setSelections(copy);
  }

  return (
    <>
    <li style={{marginBottom: '1em'}} className='two_col_70_30 gap_05'>
      <h2 className='col_1'><a href={topic_link}>{topic.title}</a></h2>
      <p className='col_1'>{body}</p>
      <input
        onChange={(e) => {toggleSelection(e, selections)}}
        className='self_center col_2 span_two_row' type='checkbox' name='remove' value={topic._id}
        />
    </li>
    </>
  )
}

export default RemoveTopicItem;
