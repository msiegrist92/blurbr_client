const animateToggle = (element, classOut, classIn, length, display) => {
  element.classList.remove(classOut);
  element.classList.add(classIn)
  element.style.display = display;
  setTimeout(() => {
    element.classList.remove(classOut);
  }, length)
}

const animateToggleDisplayTimeOut = (element, classOut, classIn, length, display) => {
  element.classList.remove(classOut);
  element.classList.add(classIn)
  setTimeout(() => {
    element.classList.remove(classOut);
    element.style.display = display;
  }, length)
}

const addClasses = (element, [...classes]) => {
  const el = document.querySelector(element);
  for (let clas of classes){
    el.classList.add(clas);
  }
}

const removeClassesTimeout = (element, length, [...classes], [...TOClasses]) => {
  const el = document.querySelector(element);
  for (let clas of classes){
    el.classList.remove(clas);
  }
  setTimeout(() => {
    for(let clas of TOClasses){
      el.classList.remove(clas)
    }
  }, length)
}


export {
  animateToggle,
  animateToggleDisplayTimeOut,
  addClasses,
  removeClassesTimeout
}
