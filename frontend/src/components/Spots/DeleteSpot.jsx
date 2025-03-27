import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/thunks/spots"; 
import OpenModal from "../Navigation/OpenModalMenuItem";
import DeleteConfirmation from "./DeleteSpotButtonContent";
import { useModal } from "../../context/Modal";

const DeleteButton = ({ spotId }) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const handleDelete = async (event) => {
            event.stopPropagation();
            await dispatch(deleteSpot(spotId));
        closeModal();
    };

    return (
        <>
        <OpenModal buttonText="Delete Spot" onButtonClick={handleDelete} modalComponent={<DeleteConfirmation spotId={spotId}/>}></OpenModal>
        </>
    );
};

export default DeleteButton;