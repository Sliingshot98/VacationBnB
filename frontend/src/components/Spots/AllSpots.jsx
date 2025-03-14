import { useDispatch, useSelector } from 'react-redux';
import './Spots.css';
import { useEffect } from 'react';
import { allSpots } from '../../store/thunks/spots';




function Spots() {
const dispatch = useDispatch();
const spots = useSelector(state => state.spotsReducer.spots)
useEffect(function(){
    if(!spots){
        dispatch(allSpots())
    }
})
console.log(spots)
return (
    <div className='main-content'>
        {spots?.map((ele,idx)=> (     
        <div key={`${idx}`} className="spots-card">
              {console.log(ele)}
            <div className="spot-image">
                    {ele.previewImage}
            </div>
            <div className="location-starrating">
                <div className='location'>
                        {ele.city}, {ele.state}
                </div>
                <div className='star-rating'>
                        {ele.avgRating}
                </div>
            </div>
            <div className='details'>
                <div className='price'>
                        {ele.price}
                </div>
            </div>
        </div>))
        
        }
    </div>
)}





export default Spots;