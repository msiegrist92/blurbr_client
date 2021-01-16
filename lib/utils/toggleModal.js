//how to do this

const toggleModal = (e, modal, set) => {
  e.preventDefault();
  if(modal) {
    setModal(false)
  } else {
    setModal(true)
  }
}

export default toggleModal;
