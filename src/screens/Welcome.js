import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {
  WelcomeText,
  PermissionButton,
  PermissionButtonText,
  NextPageButtonText,
} from './Welcome.styles';
import {CentralizedContentScreen} from '../components/Screen';
import {setUserLocationPermissionStatus} from '../state/actions';
import {
  USER_LOCATION_PERMISSION_UNKNOWN,
  USER_LOCATION_PERMISSION_DENIED,
  USER_LOCATION_PERMISSION_GRANT,
} from '../constants';
import themeContext from '../theme';

const WelcomeScreen = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const dispatch = useDispatch();

  const userLocationPermissionStatus = useSelector(
    (state) => state.userLocationPermissionStatus,
  );

  const goToNextPage = () => navigation.navigate('Home');

  async function onGeolocationGrant({coords: {latitude, longitude}}) {
    // dispatch(saveUserCoords(latitude, longitude));
    dispatch(setUserLocationPermissionStatus(USER_LOCATION_PERMISSION_GRANT));
    goToNextPage();
  }

  function onGeolocationPermissionError(error) {
    console.log(error);
    if (error.code === error.PERMISSION_DENIED) {
      dispatch(
        setUserLocationPermissionStatus(USER_LOCATION_PERMISSION_DENIED),
      );
    }
  }

  useEffect(() => {
    if (userLocationPermissionStatus === USER_LOCATION_PERMISSION_GRANT) {
      goToNextPage();
    }
  }, []);

  const requestUserGeolocation = () => {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
    });
    Geolocation.getCurrentPosition(
      onGeolocationGrant,
      onGeolocationPermissionError,
    );
  };

  const renderWelcomeText = () => {
    switch (userLocationPermissionStatus) {
      case USER_LOCATION_PERMISSION_UNKNOWN:
        return 'Precisamos ter acesso a sua localização para exibir o clima.';
      case USER_LOCATION_PERMISSION_DENIED:
        return `):
Parece que você não permitiu o acesso à sua localização.
Por favor, habilite o acesso a sua localização nas configurações do aparelho.`;
      default:
        return '';
    }
  };

  const renderWelcomeButtonText = () => {
    switch (userLocationPermissionStatus) {
      case USER_LOCATION_PERMISSION_UNKNOWN:
        return 'Permitir acesso';
      case USER_LOCATION_PERMISSION_DENIED:
        return 'Entendi, tentar novamente';
      default:
        return '';
    }
  };

  return (
    <CentralizedContentScreen>
      <WelcomeText theme={theme}>{renderWelcomeText()}</WelcomeText>
      <PermissionButton onPress={requestUserGeolocation}>
        <PermissionButtonText>{renderWelcomeButtonText()}</PermissionButtonText>
      </PermissionButton>
    </CentralizedContentScreen>
  );
};

export default WelcomeScreen;
