import { useDispatch, useSelector } from "react-redux";
import "./AllReviews.css";
import { allReviews } from "../../store/thunks/review";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import OpenModal from "../Navigation/OpenModalMenuItem";
import DeleteReviewButton from "./DeleteReviewModal";

function GetReviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.spotsReducer.details);
  
  useEffect(() => {
    if (!details) dispatch(allReviews(id));
  }, [details, dispatch, id]);

  return (
    <>
      {details &&
        details.Reviews.map((ele, idx) => {
          console.log(ele);
          return (
            <div key={idx}>
              <OpenModal
                buttonText="Delete Review"
                modalComponent={<DeleteReviewButton reviewId={ele.id} />}
              ></OpenModal>
              <p>
                {ele.User.firstName} {ele.updatedAt} {ele.review}
              </p>
            </div>
          );
        })}
    </>
  );
}
export default GetReviews;
