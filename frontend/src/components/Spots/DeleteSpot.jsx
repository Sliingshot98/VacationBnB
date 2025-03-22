import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/thunks/spots"; 

const DeleteSpotButton = ({ spotId, onDelete }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this spot?");
        if (confirmDelete) {
            await dispatch(deleteSpot({ id: spotId }));
            if (onDelete) onDelete(); 
        }
    };

    return (
        <button onClick={handleDelete} className="delete-button">
            Delete Spot
        </button>
    );
};

export default DeleteSpotButton;