import { csrfFetch } from "../csrf";


const ALL_SPOTS = 'spots/getAllSpots'
const SPOT_DETAILS = 'spots/getSpotDeatils'


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
 // =========== GET ALL SPOTS THUNK==================
export const allSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(spots(data.Spots));
    return data;
};

//========== SPOTS DETAILS THUNK===================
export const spotDetails = () => async (dispatch) => {
    const response = await csrfFetch("/api/spot/:spotId");
    const data = await response.json();
    dispatch(details(data.Spots));
    return data;
}
//=========== CREATE A SPOT THUNK=====================





//=============REDUCER===============================

const initialState = { spots:null};

const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_SPOTS:
            return {...state, spots: action.payload};
        default:
            return state;   
    }
};
export default spotsReducer;













