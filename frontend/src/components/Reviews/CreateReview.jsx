import { useDispatch, useSelector } from "react-redux";
import "./CreateReview.css";
import { useState } from "react";
import { createReview, } from "../../store/thunks/review";
import { useModal } from "../../context/Modal";
import { FaRegStar } from "react-icons/fa";

function ReviewForm({ isEdit, id }) {
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  
  const [stars] = useState(1);
  const [review, setReview] = useState("");
  const handleSubmit = async function (event) {
        event.preventDefault();
        const payload = {
          stars,
          review,
          id,
          userId: sessionUser.id
        }
        if(isEdit){
            //todo: dispatch update thunk
        }else{
            
            dispatch(createReview(payload))
            closeModal();
        }
  };
  

  return (
    <div onSubmit={handleSubmit} className="reviewForm">
      <div className="headingOne">
        <h1>How was your stay?</h1>
      </div>
      <div className="inputBox">
        <textarea onChange={function(event){
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
        <button onClick={handleSubmit}>Submit your Review</button>
      </div>
    </div>
  );
}

export default ReviewForm;
