import { useDispatch, useSelector } from 'react-redux';
import './SpotDetails.css';
import { useEffect} from 'react';
import { spotDetails } from '../../store/thunks/spots';
import { useParams } from 'react-router-dom';
import GetReviews from '../Reviews/AllReviews';
import OpenModal from '../Navigation/OpenModalMenuItem';
import ReviewForm from '../Reviews/CreateReview';




function SpotDetails() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spotsReducer.details)
    useEffect(() => {
        if(!spot || spot.id !== Number(id)){
         dispatch(spotDetails(id));
        }
    });
    console.log(spot)
    
return spot &&
(<div className= 'Entire-detail'>

    <div  className='NameOfSpot'>
        {spot.name}
    </div>
    <div className='CityStateCountry'>   
        {spot.city}, {spot.state}, {spot.country}
    </div>
    <img className="PreviewImage" src={spot.previewImage}>
      
    </img>
    <div className='Host'>
        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
    </div>
    <div className='Description'>
        {spot.description}
    </div>
    <div className='Reviews'>
        {spot.avgRating} Star Rating
    </div>
    <div className="ReviewText">
        <OpenModal modalComponent = {<ReviewForm isEdit={false}/>} buttonText = "Post Your Review" ></OpenModal>
        {<GetReviews></GetReviews>}
    </div>
    
</div>)
}


export default SpotDetails;