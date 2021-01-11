import React from 'react';

const DisbandGroup = ({group_data, modal, toggleModal}) => {


  return (
    <>
      <div className='purple_form center_cont container'>
        <h3 className='center_cont'>Please contact support with any issues</h3>
        <button style={{width: '50%'}}className='call_to self_center'
          onClick={(e) => {toggleModal(e)}}
          >Disband Group</button>
      </div>
    </>
  )
}

export default DisbandGroup;
