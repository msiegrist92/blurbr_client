import React, {useState} from 'react';
import AdminCard from './AdminCard';

const AdminPanel = ({changeSlide, config}) => {

  const cards = config.map((item, i) => {
    return <AdminCard key={i} config_item={item} changeSlide={changeSlide} />
  })

  return (

    <div className='color_container two_col_fr container gap_4'>
      {cards}
    </div>

  )
}

export default AdminPanel;
