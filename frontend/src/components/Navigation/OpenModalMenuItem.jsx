import { useModal } from '../../context/Modal';

function OpenModal({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonText, // text of button that opens the modal
  onButtonClick, // optional callback function that fires when the button is clicked.
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
    if(typeof onButtonClick === "function") onButtonClick();

  };

  return( <>{ buttonText ? (<button onClick={onClick}>{buttonText}</button>) : (<li onClick={onClick}>{itemText}</li>)}</>
    )
  ;
}

export default OpenModal;