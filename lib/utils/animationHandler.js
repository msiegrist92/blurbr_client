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


export {
  animateToggle,
  animateToggleDisplayTimeOut
}
