import React, {useEffect, useState, useLayoutEffect} from 'react';

const Modal = ({children, show, toggle}) => {

  let modal_class = '';

  if(show){
    modal_class = 'show_modal'
  } else {
    modal_class = 'hide_modal'
  }


  return (
      <div className={modal_class + " modal"}>
        {children}
        <button
          className='big_button pos_right'
          onClick={(e) => toggle(e, show)}>
          Hide
        </button>
      </div>

  )
}

export default Modal;
