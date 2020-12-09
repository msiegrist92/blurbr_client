import React, {useState, useEffect} from 'react';
import TopicListUser from '../topics/TopicListUser';
import {animateToggle, animateToggleDisplayTimeOut} from '../../lib/utils/animationHandler';

const TopicsDropDown = ({topics}) => {

  const [display, setDisplay] = useState(false);


  const dropTopics = (e, display) => {
    e.preventDefault();
    const list = document.querySelector('.topics_list');

    if (display === false){
      animateToggle(list, 'slide_up', 'drop_down', 400, 'block');
      setDisplay(true);

    } else {
      animateToggleDisplayTimeOut(list, 'drop_down', 'slide_up', 400, 'none')
      setDisplay(false)
    }
  }

  const topics_list = topics.map((topic) => {
    return <TopicListUser key={topic._id} topic={topic} />
  })

  return (
    <>
    <h1 className='topics center_text'>
      Topics

      {display === true &&
        <i
        onClick={(e) => {dropTopics(e, display)}}
        className='caret down icon'></i>
      }

      {display === false &&
        <i
        onClick={(e) => {dropTopics(e, display)}}
        className='caret right icon'></i>
      }
  </h1>
    {topics_list.length > 0 &&
      <ul className='topics_list'
          style={{display:'none'}}
        >
        {topics_list}
      </ul>
    }
    {topics_list.length === 0 &&
      <h4 className='topics_list'
          style={{display:'none'}}>
          User has not created any topics</h4>
    }
    </>
  )
}

export default TopicsDropDown
