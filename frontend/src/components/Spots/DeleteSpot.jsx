import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/thunks/spots"; 

const DeleteButton = ({ spotId, onDelete }) => {
    const dispatch = useDispatch();

    const handleDelete = async (event) => {
            event.stopPropagation();
            await dispatch(deleteSpot(spotId));
        
    };

    return (
        <button onClick={handleDelete} className="delete-button">
            Delete Spot
        </button>
    );
};

export default DeleteButton;