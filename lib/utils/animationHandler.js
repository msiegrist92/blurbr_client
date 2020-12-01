const animateBlock = (element, classOut, classIn,length) => {
  element.classList.remove(classOut);
  element.classList.add(classIn)
  element.style.display = 'block';
  setTimeout(() => {
    element.classList.remove('drop_down');
  }, length)
}

export default animateBlock;
