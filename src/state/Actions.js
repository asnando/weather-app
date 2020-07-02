export const SAVE_USER_COORDS_ACTION_TYPE = 'SAVE_USER_COORDS';
export const SET_USER_LOCATION_PERMISSION_STATUS = 'SET_USER_LOCATION_PERMISSION_STATUS';

export const saveUserCoords = (latitude, longitude) => ({
  type: SAVE_USER_COORDS_ACTION_TYPE,
  payload: {
    latitude,
    longitude,
  },
});

export const setUserLocationPermissionStatus = (status) => ({
  type: SET_USER_LOCATION_PERMISSION_STATUS,
  payload: {
    userLocationPermissionStatus: status,
  },
});
