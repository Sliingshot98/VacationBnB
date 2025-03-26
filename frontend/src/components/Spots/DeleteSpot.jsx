import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/thunks/spots"; 
import OpenModal from "../Navigation/OpenModalMenuItem";
import DeleteConfirmation from "./DeleteSpotButtonContent";


const DeleteButton = ({ spotId }) => {
    const dispatch = useDispatch();

    const handleDelete = async (event) => {
            event.stopPropagation();
            await dispatch(deleteSpot(spotId));
        
    };

    return (
        <>
        <OpenModal buttonText="Delete Spot" onButtonClick={handleDelete} modalComponent={<DeleteConfirmation/>}></OpenModal>
        </>
    );
};

export default DeleteButton;