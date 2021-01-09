import React, {useState} from 'react';

const BigSlider = ({slides, index}) => {

  return (
    <>
    <div className='big_slider'>
      {slides[index]}
    </div>
    </>
  )
}

export default BigSlider;
