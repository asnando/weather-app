export const SAVE_USER_COORDS_ACTION_TYPE = 'SAVE_USER_COORDS';

export const saveUserCoords = (latitude, longitude) => ({
  type: SAVE_USER_COORDS_ACTION_TYPE,
  payload: {
    latitude,
    longitude,
  },
});
