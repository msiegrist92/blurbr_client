const pressCard = (card, icon) => {
  card.classList.add('pressed_card');
  icon.classList.remove('yellow');
  icon.classList.add('purple');
}

const getSlideNum = classList => {
  let list = Array.prototype.slice.call(classList)
  const slide_REGEXP = /slide_link_\d/g;

  let slide_num = list.filter((clas) => {
    return clas.match(slide_REGEXP)
  })
  return slide_num[0].charAt(slide_num[0].length - 1)
}

const depressCards = (cards, pressed_card) => {
  for(let card of cards){
    if(card !== pressed_card){
      card.classList.remove('pressed_card')
      let icon = card.querySelector('i');
      icon.classList.remove('purple');
      icon.classList.add('yellow');
    }
  }
}


export {
  pressCard,
  getSlideNum,
  depressCards
}
