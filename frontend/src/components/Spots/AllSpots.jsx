import { useDispatch, useSelector } from 'react-redux';
import './Spots.css';
import { useEffect } from 'react';
import { allSpots } from '../../store/thunks/spots';
import { useNavigate } from 'react-router-dom';




function Spots() {
const dispatch = useDispatch();
const navigateTo = useNavigate();
const spots = useSelector(state => state.spotsReducer.spots)
const spotsArray = Object.values(spots || {})
useEffect(function(){
    if(!spotsArray.length){
        dispatch(allSpots())
    }
}, [spotsArray.length, dispatch])

return (
    <div className='main-content'>
        {spotsArray?.map((ele,idx)=> (     
        <div key={`${idx}`} className="spots-card" onClick={function(){navigateTo(`/spots/${ele.id}`)}}>
              
            <img className="spot-image" src ={ele.previewImage}>                   
            </img>
            <div className="location-starrating">
                <div className='location'>
                        {ele.city}, {ele.state}
                </div>
                <div className='star-rating'>
                        {ele.avgRating} Stars
                </div>
            </div>
            <div className='details'>
                <div className='price'>
                        ${ele.price} per night
                </div>
            </div>
        </div>))
        
        }
    </div>
)}





export default Spots;