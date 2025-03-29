import { useDispatch, useSelector } from "react-redux";
import "./AllReviews.css";
import { allReviewsBySpotId } from "../../store/thunks/review";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import OpenModal from "../Navigation/OpenModalMenuItem";
import DeleteReviewButton from "./DeleteReviewModal";

function GetReviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const reviewsArray = Object.values(reviews || {});

  useEffect(() => {
    if (!reviews || !reviewsArray.length) dispatch(allReviewsBySpotId(id));
  }, [reviews, reviewsArray.length, dispatch, id]);

  return (
    <>
      {reviewsArray.length > 0 &&
        reviewsArray.map((ele, idx) => {
          return (
            <div key={idx}>
              {sessionUser && sessionUser.id === ele.id && (
                <OpenModal
                  buttonText="Delete Review"
                  modalComponent={<DeleteReviewButton reviewId={ele.id} />}
                ></OpenModal>
              )}
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
