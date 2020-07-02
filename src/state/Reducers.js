import {SAVE_USER_COORDS_ACTION_TYPE} from './actions';

const INITIAL_STATE = {
  lastUserGeolocation: {
    latitude: null,
    longitude: null,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER_COORDS_ACTION_TYPE:
      return {
        ...state,
        lastUserGeolocation: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
