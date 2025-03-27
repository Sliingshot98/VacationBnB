import { useDispatch, useSelector } from "react-redux";
import "./SpotDetails.css";
import { useEffect, useState } from "react";
import { spotDetails } from "../../store/thunks/spots";
import { useParams } from "react-router-dom";
import GetReviews from "../Reviews/AllReviews";
import OpenModal from "../Navigation/OpenModalMenuItem";
import ReviewForm from "../Reviews/CreateReview";

function SpotDetails() {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const spot = useSelector((state) => state.spotsReducer.details);
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const reviewsArray = Object.values(reviews || {});
  //   const reviews = useSelector((state) => state.reviewsReducer.reviews)
  useEffect(() => {
    if (!spot || spot.id !== Number(id)) {
      dispatch(spotDetails(id));
    }
  });
useEffect(()=> {
    
    if(sessionUser && Array.isArray(reviewsArray) && !reviewsArray.find(function (ele) {
        return ele.userId === sessionUser.id;
      })){
        setVisibility(false)
      } else {
        setVisibility(true)
      }
}, [sessionUser, reviewsArray]);
  return (
    spot && (
      <div className="Entire-detail">
        <div className="NameOfSpot">{spot.name}</div>
        <div className="CityStateCountry">
          {spot.city}, {spot.state}, {spot.country}
        </div>
        <img className="PreviewImage" src={spot.previewImage}></img>
        <div className="Host">
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </div>
        <div className="Description">{spot.description}</div>
        <div className="Reviews">{spot.avgRating} Star Rating</div>
        <div className="ReviewText">
          <div className="review-button">
            {sessionUser &&
              sessionUser.id !== spot.Owner.id &&
              Array.isArray(reviewsArray) &&
              reviewsArray.length > 0 &&
              (
                  <div style={{display: visibility ? "none" : "block"}}>
                    <OpenModal
                      modalComponent={
                        <ReviewForm isEdit={false} id={spot?.id} />
                      }
                      buttonText="Post Your Review"
                    ></OpenModal>
                  </div>
                )}
          </div>
          {<GetReviews></GetReviews>}
        </div>
      </div>
    )
  );
}

export default SpotDetails;
