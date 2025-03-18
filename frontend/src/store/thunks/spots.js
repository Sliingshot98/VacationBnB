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
const create = (spots)=> {
    return {
        type: CREATE_SPOT ,
        payload: spots
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
export const spotDetails = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/:spotId");
    const data = await response.json();
    dispatch(details(data.Spots));
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
export const createSpot = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    
    return data;
}



//============ EDIT A SPOT THUNK=====================




//==============DELETE A SPOT THUNK==================




//=============REDUCER===============================

const initialState = { spots:null};

const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_SPOTS:
            return {...state, spots: action.payload};
        case SPOT_DETAILS:
            return {...state, deatils: action.payload};  
        case USER_SPOT_DETAILS:
            return {...state, userSpotDetails: action.payload};
        case CREATE_SPOT:
            return{}       
        default: 
            return state;   
    }
};
export default spotsReducer;













