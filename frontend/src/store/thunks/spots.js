import { csrfFetch } from "../csrf";

const ALL_SPOTS = "spots/getAllSpots";
const SPOT_DETAILS = "spots/getSpotDeatils";
const SPOT_IMAGES_VIA_SPOT_ID = "spots/spotImagesViaSpotId";
const CREATE_SPOT = "spots/postCreateSpot";
const UPDATE_SPOT = "spots/putUpdateSpot";
const DELETE_SPOT = "spots/deleteDeleteSpot";

const getSpotImagesViaSpotId = (payload) => {
  return {
    type: SPOT_IMAGES_VIA_SPOT_ID,
    payload,
  };
};
const spots = (spots) => {
  return {
    type: ALL_SPOTS,
    payload: spots,
  };
};
const details = (spots) => {
  return {
    type: SPOT_DETAILS,
    payload: spots,
  };
};

const create = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot,
  };
};
const update = (payload) => {
  return {
    type: UPDATE_SPOT,
    payload,
  };
};
const deleteTheSpot = (payload) => {
  return {
    type: DELETE_SPOT,
    payload,
  };
};
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
  dispatch(getSpotImagesViaSpotId(data.Spot.SpotImages));
  dispatch(details(data.Spot));
  return data;
};

//=========== CREATE A SPOT THUNK=====================
export const createSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  dispatch(getSpotImagesViaSpotId(data.createdImages));
  dispatch(create(data));
  return data;
};

//============ EDIT A SPOT THUNK=====================
export const updateSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  dispatch(update(data));
  return data;
};

//==============DELETE A SPOT THUNK==================
export const deleteSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload}`, {
    method: "DELETE",
  });
  const data = await response.json();
  dispatch(deleteTheSpot(data));
  return data;
};

//=============REDUCER===============================

const initialState = { spots: null, details: null, spotImages: null };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SPOTS: {
      const newState = { ...state };
      newState.spots = {};
      action.payload.forEach(function (element) {
        newState.spots[element.id] = element;
      });
      return newState;
    }
    case SPOT_DETAILS:
      return { ...state, details: { ...action.payload } };
    case CREATE_SPOT:
      return {
        ...state,
        spots: { ...state.spots, [action.payload.id]: action.payload },
      };
    case UPDATE_SPOT:
      return {
        ...state,
        updated: { ...action.payload },
        spots: { ...state.spots, [action.payload.id]: action.payload },
      };
    case DELETE_SPOT: {
      const newState = { ...state };
      newState.spots = { ...state.spots };
      delete newState.spots[action.payload.id];
      return newState;
    }
    case SPOT_IMAGES_VIA_SPOT_ID: {
      const newState = { ...state };
      newState.spotImages = {};
      action.payload.forEach((ele) => {
        newState.spotImages[ele.id] = ele;
      });

      return newState;
    }
    default:
      return state;
  }
};
export default spotsReducer;
