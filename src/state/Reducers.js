import {
  SAVE_USER_COORDS_ACTION_TYPE,
  SET_USER_LOCATION_PERMISSION_STATUS,
} from './actions';

const INITIAL_STATE = {
  lastUserGeolocation: {
    latitude: null,
    longitude: null,
  },
  userLocationPermissionStatus: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER_COORDS_ACTION_TYPE:
      return {
        ...state,
        lastUserGeolocation: action.payload,
      };
    case SET_USER_LOCATION_PERMISSION_STATUS:
      return {
        ...state,
        userLocationPermissionStatus: action.payload.userLocationPermissionStatus,
      };
    default:
      return state;
  }
};

export default reducer;
