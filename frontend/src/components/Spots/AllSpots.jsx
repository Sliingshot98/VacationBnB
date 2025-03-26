import { useDispatch, useSelector } from 'react-redux';
import './Spots.css';
import { useEffect } from 'react';
import { allSpots } from '../../store/thunks/spots';
import { useNavigate, useLocation } from 'react-router-dom';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteSpot';


function Spots() { 
const {pathname}= useLocation();      
const dispatch = useDispatch();
const navigateTo = useNavigate();
const sessionUser = useSelector(state => state.session.user)
const spots = useSelector(state => state.spotsReducer.spots)
const spotsArray = Object.values(spots || {})
useEffect(function(){
    if(!spotsArray.length ){
        dispatch(allSpots())
        
    }
}, [spotsArray.length, dispatch])
useEffect(function(){
    if(!sessionUser){
        navigateTo("/")
    }
})

return (
    <div className='main-content'>
         {pathname === "/" && spotsArray?.map((ele,idx)=> (  
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
         {sessionUser && pathname === "/spots/current" && spotsArray?.filter(function(ele){
            return ele.ownerId === sessionUser.id
         }  
         ).map((ele,idx)=> (  
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
           <div className= "buttons" > 
                <UpdateButton id = {ele.id}/>
                <DeleteButton spotId = {ele.id} />
            </div>
        </div>))
        }
    </div>
)}





export default Spots;