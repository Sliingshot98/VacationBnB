import { useDispatch, useSelector } from "react-redux";
import "./CreateReview.css";
import { useEffect, useState } from "react";
import { createReview, updateReview } from "../../store/thunks/review";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { FaRegStar } from "react-icons/fa";

function ReviewForm({ isEdit }) {
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [stars, setStars] = useState(1);
  const [review, setReview] = useState("");
  const handleSubmit = async function (event) {
        event.preventDefault();
        if(isEdit){
            //todo: dispatch update thunk
        }else{
            const payload = {
                stars, review, spotId:id, userId: sessionUser.id 
            };
            dispatch(createReview(payload))
            closeModal();
        }
  };
  const handleButtonClick = function () {
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="reviewForm">
      <div className="headingOne">
        <h1>How was your stay?</h1>
      </div>
      <div className="inputBox">
        <textarea onChange={function(evemt){
            setReview(event.target.value)
        }} type="text"></textarea>
      </div>
      <div className="stars">
        <div>
          <span>
            <FaRegStar  />
          </span>
          <span>
            <FaRegStar />
          </span>
          <span>
            <FaRegStar />
          </span>
          <span>
            <FaRegStar />
          </span>
          <span>
            <FaRegStar />
          </span>
        </div>
        <span>Stars</span>
      </div>
      <div className="submitButton">
        <button onClick={handleButtonClick}>Submit your Review</button>
      </div>
    </form>
  );
}

export default ReviewForm;
