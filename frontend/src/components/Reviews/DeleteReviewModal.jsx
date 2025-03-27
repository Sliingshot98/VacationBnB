import "./DeleteReviewModal.css";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/thunks/review";
import { useModal } from "../../context/Modal";
function DeleteReviewButton({reviewId}){
    console.log(reviewId)
    const dispatch = useDispatch();
    const {closeModal} =useModal();
const handleDelete = async () => {
    await dispatch(deleteReview(reviewId));
    closeModal();
}
    return(
        <div className="entire-Delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}
export default DeleteReviewButton;