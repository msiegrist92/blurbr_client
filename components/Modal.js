import React, {useEffect, useState, useLayoutEffect} from 'react';
import {addClasses, removeClassesTimeout} from '../lib/utils/animationHandler';
const Modal = ({children, show, toggle}) => {


  if (show){
    addClasses('.modal', ['show_modal_pos', 'show_modal_opacity']);
  }



  return (
      <div className='modal'>
        {children}
        <button
          className='big_button pos_right'
          onClick={(e) => {
            e.preventDefault()
            removeClassesTimeout('.modal', 1000, ['show_modal_opacity'], ['show_modal_pos']);
            // document.querySelector('.modal').classList.remove('show_modal_opacity')
            // setTimeout(() => {
            //   document.querySelector('.modal').classList.remove('show_modal_pos')
            // }, 1000)
            toggle(e, show)}}>
          Hide
        </button>
      </div>

  )
}

export default Modal;
