import { useDispatch, useSelector } from "react-redux";
import './AllReviews.css';
import { allReviews } from "../../store/thunks/review";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


function GetReviews(){
const dispatch = useDispatch();
const { id } = useParams();
const review = useSelector(state => state.reviewsReducer.reviews)
const reviewsArray = Object.values(review || {})

useEffect(() => {
    if(!reviewsArray.length)
    dispatch(allReviews(id));
}, [reviewsArray.length, dispatch, id])

return ( 
    <>
      {reviewsArray.length > 0 && reviewsArray.map((ele, idx) => {
        
        return <p key={idx} >{ele.User.firstName} {ele.updatedAt} {ele.review}</p>
      })}
    </>
)
}
export default GetReviews;