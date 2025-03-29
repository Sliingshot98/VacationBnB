import { useDispatch, useSelector } from "react-redux";
import "./SpotDetails.css";
import { useEffect, useRef } from "react";
import { spotDetails } from "../../store/thunks/spots";
import { useParams } from "react-router-dom";
import GetReviews from "../Reviews/AllReviews";
import OpenModal from "../Navigation/OpenModalMenuItem";
import ReviewForm from "../Reviews/CreateReview";

function SpotDetails() {
  const createdImages = useSelector((state) => state.spotsReducer.spotImages);
  const visible = useRef(true);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const spot = useSelector((state) => state.spotsReducer.details);
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const createdImagesArray = Object.values(createdImages || {});
  const reviewsArray = Object.values(reviews || {});
  //   const reviews = useSelector((state) => state.reviewsReducer.reviews)
  useEffect(() => {
    if (!spot || spot.id !== Number(id)) {
      dispatch(spotDetails(id));
    }
  }, [spot, id, dispatch]);

  useEffect(() => {
    if (
      sessionUser &&
      Array.isArray(reviewsArray) &&
      !reviewsArray.find(function (ele) {
        return ele.userId === sessionUser.id;
      })
    ) {
      visible.current = false;
    } else {
      visible.current = true;
    }
  }, [sessionUser, reviewsArray]);

  return (
    spot &&
    createdImagesArray.length > 0 && (
      <div className="Entire-detail">
        <div className="NameOfSpot">{spot.name}</div>
        <div className="CityStateCountry">
          {spot.city}, {spot.state}, {spot.country}
        </div>
        <div className="images">
          <img className="PreviewImage" src={spot.previewImage}></img>
          <div className="extra-images">
            <img src={createdImagesArray[0]?.url}></img>
            <img src={createdImagesArray[1]?.url}></img>
            <img src={createdImagesArray[2]?.url}></img>
            <img src={createdImagesArray[3]?.url}></img>
          </div>
        </div>
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
              reviewsArray.length > 0 && (
                <div style={{ display: visible.current ? "none" : "block" }}>
                  <OpenModal
                    modalComponent={<ReviewForm isEdit={false} id={spot?.id} />}
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
