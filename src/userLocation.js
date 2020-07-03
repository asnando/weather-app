// A atualização dos dados de localização do usuário e suas respectivas
// permissões são disponiblizadas pelo plugin "@react-native-community/geolocation",
// sendo este plugin utilizado pelas duas telas do app. As informações acima são
// armazenadas e persistidas através do redux. Este arquivo é responsável
// por disponibilizar todas as funções que acessam a localização e atualizá-las
// dentro da store do redux através da chamada dos dispatchers fornecidos pelos
// componentes das telas.

import Geolocation from '@react-native-community/geolocation';
import {
  saveUserLocation,
  setUserLocationPermissionStatus,
} from './state/actions';
import {
  USER_LOCATION_PERMISSION_UNKNOWN,
  USER_LOCATION_PERMISSION_GRANTED,
  USER_LOCATION_PERMISSION_DENIED,
} from './constants';

const callCallback = (fn, args = []) => {
  if (typeof fn === 'function') {
    fn(...args);
  }
};

function getCurrentUserLocation(
  dispatch,
  {updateLocationPermission = true, updateUserLocation = false} = {},
  successCallback,
) {
  function onLocationPermissionGrant({coords: {latitude, longitude}}) {
    if (updateLocationPermission) {
      dispatch(
        setUserLocationPermissionStatus(USER_LOCATION_PERMISSION_GRANTED),
      );
    }
    if (updateUserLocation) {
      dispatch(saveUserLocation(latitude, longitude));
    }
    callCallback(successCallback, [{latitude, longitude}]);
  }

  function onLocationPermissionError(error) {
    console.log(
      'Usuário negou permissão à localização ou ocorreu um erro inesperado.',
    );
    console.log(error);
    if (updateLocationPermission) {
      if (error.code === error.PERMISSION_DENIED) {
        dispatch(
          setUserLocationPermissionStatus(USER_LOCATION_PERMISSION_DENIED),
        );
      } else {
        dispatch(
          setUserLocationPermissionStatus(USER_LOCATION_PERMISSION_UNKNOWN),
        );
      }
    }
  }

  Geolocation.getCurrentPosition(
    onLocationPermissionGrant,
    onLocationPermissionError,
  );
}

// Esta função exibe a popup nativa de permissão a localização e atualiza
// exclusivamente o status desta permissão.
export function requestUserLocationPermission(dispatch, successCallback) {
  getCurrentUserLocation(
    dispatch,
    {updateLocationPermission: true},
    successCallback,
  );
}

// Esta função atualiza as coordenadas do usuário sempre que chamada, e como side
// effect, poderá invalidar a flag de permissão à localização caso o usuário tenha
// desabilitado a mesma em seu aparelho.
export function refreshUserLocation(dispatch, successCallback) {
  getCurrentUserLocation(dispatch, {updateUserLocation: true}, successCallback);
}
