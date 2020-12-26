import React, {useState, useEffect} from 'react';
import TopicListUser from './topics/TopicListDropDown';
import {animateToggle, animateToggleDisplayTimeOut} from '../lib/utils/animationHandler';

const TopicsDropDown = ({list, class_name, list_name, h1_class}) => {

  h1_class += ' center_text'

  const [display, setDisplay] = useState(false);


  const dropList = (e, display) => {
    e.preventDefault();
    const list = document.querySelector('.' + class_name);

    if (display === false){
      animateToggle(list, 'slide_up', 'drop_down', 400, 'block');
      setDisplay(true);

    } else {
      animateToggleDisplayTimeOut(list, 'drop_down', 'slide_up', 400, 'none')
      setDisplay(false)
    }
  }

  return (
    <>
    <div className='caret_drop_cont'>
      <h1 className={h1_class}>
        {list_name}

        {display === true &&
          <i
          onClick={(e) => {dropList(e, display)}}
          className='caret down yellow icon'></i>
        }

        {display === false &&
          <i
          onClick={(e) => {dropList(e, display)}}
          className='caret right yellow icon'></i>
        }
      </h1>
      {list.length > 0 &&
        <ul className={class_name + ' caret_drop'}
            style={{display:'none'}}
          >
          {list}
        </ul>
      }
      {list.length === 0 &&
        <ul className={class_name + ' caret_drop'}
            style={{display:'none'}}>
            List is empty</ul>
      }
    </div>
    </>
  )
}

export default TopicsDropDown
