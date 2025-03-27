import { csrfFetch } from "../csrf";

const ALL_REVIEWS = "spots/getAllReviews";
// const SPOT_REVIEWS = "spots/getSpotReviews";
// const USER_SPOT_REVIEWS = "reviews/getUserSpotReview";
const CREATE_REVIEW = "reviews/postCreateReview";
const UPDATE_REVIEW = "reviews/putUpdateReview";
const DELETE_REVIEW = "reviews/deleteDeleteREview";

const reviews = (reviews) => {
    return {
      type: ALL_REVIEWS,
      payload: reviews,
    };
  };
  // const details = (reviews) => {
  //   return {
  //     type: SPOT_REVIEWS,
  //     payload: reviews,
  //   };
  // };
  // const userSpotReviews = (reviews) => {
  //   return {
  //     type: USER_SPOT_REVIEWS,
  //     payload: reviews,
  //   };
  // };
  const create = (review) => {
    return {
      type: CREATE_REVIEW,
      payload: review,
    };
  };
  const update = (payload) => {
    return {
      type: UPDATE_REVIEW,
      payload,
    };
  };
  const deleteTheReview = (payload) => {
    return {
      type: DELETE_REVIEW,
      payload,
    };
  };
// //================GET ALL REVIEWS++++++++++++++++
export const allReviewsBySpotId= (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  dispatch(reviews(data.Reviews));
  return data;
};

// //=================Detail by user=================
// export const spotReviewsByUser = () => async (dispatch) => {
//   const response = await csrfFetch("/api/reviews/current");
//   const data = await response.json();
//   console.log(data)
//   dispatch(details(data.Reviews));
//   return data;
// };


// //==================Create Review++++++++++++++++++++++
export const createReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  dispatch(create(data));
  return data;
};


// //====================edit REVIEW======================

export const updateReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  dispatch(update(data));
  return data;
};

//===================Delete review=================
export const deleteReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${payload}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log('this is the data', data)
  dispatch(deleteTheReview(data));
  return data;
};


//=-===============REDUCER Party==================
const initialState = { reviews: null };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_REVIEWS: {
      const newState = { ...state };
      newState.reviews = {};
      action.payload.forEach(function (element) {
        newState.reviews[element.id] = element;
      });
      return newState;
    }
    // case SPOT_REVIEWS:
    //   return { ...state, details: {...action.payload} };
    // case USER_SPOT_REVIEWS:
    //   return { ...state, userSpotReviews: action.payload };
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: { ...state.reviews, [action.payload.id]: action.payload },
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: { ...state.reviews, [action.payload.id]: action.payload },
      };
    case DELETE_REVIEW: {
      const newState = { ...state };
      newState.reviews= {...state.reviews}
      delete newState.reviews[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};


 export default reviewsReducer;