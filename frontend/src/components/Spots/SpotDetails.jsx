import { useDispatch, useSelector } from 'react-redux';
import './SpotDetails.css';
import { useEffect} from 'react';
import { spotDetails } from '../../store/thunks/spots';
import { useParams } from 'react-router-dom';

function SpotDetails() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spotsReducer.details?.Spot)
    useEffect(() => {
        if(!spot){
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
    <div className="PreviewImage">
      {spot.previewImage}
    </div>
    <div className='Host'>
        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
    </div>
    <div className='Description'>
        {spot.description}
    </div>
    <div className='Reviews'>
        {spot.avgRating}
    </div>
    
</div>)
}


export default SpotDetails;