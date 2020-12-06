import React, {useEffect, useState, useLayoutEffect} from 'react';
import {animateToggleDisplayFirst} from '../lib/utils/animationHandler';
const Modal = ({children, show, toggle}) => {

  if (show){
    const modal = document.querySelector('.modal');
    modal.classList.add('show_modal');
  }



  return (
      <div className='modal'>
        {children}
        <button
          className='big_button pos_right'
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('.modal').classList.remove('show_modal')
            toggle(e, show)}}>
          Hide
        </button>
      </div>

  )
}

export default Modal;
