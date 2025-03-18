import { useDispatch, useSelector } from 'react-redux';
import './SpotDetails.css';
import { useEffect, useInsertionEffect } from 'react';
import { spotDetails } from '../../store/thunks/spots';

function SpotDetails( spotId ) {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotsReducer.spots)
    useEffect(() => {
        dispatch(spotDetails(spotId));
        if(!spots){
            return <p>Hold your horses! This doesn't exist yet!</p>
        }
    })
return(
<>
    <div className=''>



    </div>
</>



)}










export default spotDetails;