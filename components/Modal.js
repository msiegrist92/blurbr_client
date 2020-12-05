import React, {useEffect, useState, useLayoutEffect} from 'react';

const Modal = ({children, show}) => {

  let modal_class = '';

  if(show){
    modal_class = 'show_modal'
  } else {
    modal_class = 'hide_modal'
  }


  return (
      <div className={modal_class + " modal"}>
        {children}
        <button onClick={(e) => {e.preventDefault();
          //THIS FUNCTION JUST NEEDS TO LIFT STATE UP TO PARENT TO TOGGLE
          document.querySelector('.modal').classList.toggle('hide_modal')
          document.querySelector('.modal').classList.toggle('show_modal')
        }}>
          Hide
        </button>
      </div>

  )
}

export default Modal;
