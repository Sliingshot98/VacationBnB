import { csrfFetch } from "../csrf";


const ALL_SPOTS = 'spots/getAllSpots'
const SPOT_DETAILS = 'spots/getSpotDeatils'
const USER_SPOT_DETAILS = 'spots/getUserSpotDetails'
const CREATE_SPOT = 'spots/postCreateSpot'

const spots = (spots) => {
    return {
        type: ALL_SPOTS ,
        payload: spots    
    }
} 
const details = (spots)=> {
    return {
        type: SPOT_DETAILS ,
        payload: spots
    } 
}
const userSpotDetails = (spots)=> {
    return {
        type: USER_SPOT_DETAILS ,
        payload: spots
    }
}
const create = (spot)=> {
    return {
        type: CREATE_SPOT ,
        payload: spot
    }
}
 // =========== GET ALL SPOTS THUNK==================
export const allSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(spots(data.Spots));
    return data;
};

//========== SPOTS DETAILS THUNK===================
export const spotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(details(data));
    return data;
}
//========== SPOTS DETAILS BY CURRENT USER THUNK========
export const spotDetailsByUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current");
    const data = await response.json();
    dispatch(userSpotDetails(data.Spots));
    return data;
}


//=========== CREATE A SPOT THUNK=====================
export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {method:"POST",body: JSON.stringify(payload)});
    const data = await response.json();
    dispatch(create(data))
    return data;
}



//============ EDIT A SPOT THUNK=====================




//==============DELETE A SPOT THUNK==================




//=============REDUCER===============================

const initialState = { spots:null };

const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_SPOTS:
           { const newState = {...state}
           newState.spots = {}
            action.payload.forEach(function(element){
                newState.spots[element.id] = element
            }) 
            return newState}
        case SPOT_DETAILS:
            return {...state, details: action.payload};  
        case USER_SPOT_DETAILS:
            return {...state, userSpotDetails: action.payload};
        case CREATE_SPOT:
            {
            const idx = state.spots[action.payload.id]
            return{...state, spots: {...state.spots}, [idx]:action.payload}; 
        }      
        default: 
            return state;   
    }
};
export default spotsReducer;













