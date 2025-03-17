import { csrfFetch } from "../csrf";

















const initialState = { reviews:null};
const reviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_REVIEWS:
            return {...state, reviews: action.payload};
        default: 
            return state;   
    }
};
export default reviewsReducer;