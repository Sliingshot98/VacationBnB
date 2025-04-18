import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/thunks/spots";


function DeleteConfirmation({ spotId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const handleDelete = async function () {
    dispatch(deleteSpot(spotId));
    closeModal();
  };
  return (
    <div className="entire-form">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div className="buttons">
        <div className="delete-yes">
          <button onClick={handleDelete}>Yes (Delete spot)</button>
        </div>
        <div className="delete-no">
          <button onClick={closeModal}>No (Keep spot)</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
