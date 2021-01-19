import React, {useState} from 'react';

const AdminCard = ({config_item, changeSlide}) => {

  const slide_classes = `manage_card slide_link_${config_item.slide_num}`;
  const icon_classes = `${config_item.icon_class} icon massive yellow`

  return (
    <div className={slide_classes}
      onClick={(e) => {changeSlide(e)}}
    >
      <i className={icon_classes}></i>
      <h2>{config_item.title}</h2>
    </div>
  )
}

export default AdminCard;
