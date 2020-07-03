/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';
import {
  WelcomeText,
  PermissionButton,
  PermissionButtonText,
} from './Welcome.styles';
import {Screen} from '../components/Screen';
import {
  saveUserCoords,
  setUserLocationPermissionStatus,
} from '../state/actions';
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
    dispatch(saveUserCoords(latitude, longitude));
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
      // Como a tela de apresentação possui uma animação,
      // aguarde ao menos 2s para apresenta-lá ao usuário,
      // mesmo que o mesmo já tenha dado permissão ao app anteriormente.
      setTimeout(goToNextPage, 2000);
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
        return `Parece que você não permitiu o acesso à sua localização.
Por favor, habilite este acesso nas configurações do aparelho.`;
      case USER_LOCATION_PERMISSION_GRANT:
      default:
        return 'Redirecionando…';
    }
  };

  const renderWelcomeButtonText = () => {
    switch (userLocationPermissionStatus) {
      case USER_LOCATION_PERMISSION_UNKNOWN:
        return 'Permitir acesso';
      case USER_LOCATION_PERMISSION_DENIED:
        return 'Entendi, tentar novamente';
      case USER_LOCATION_PERMISSION_GRANT:
      default:
        return '';
    }
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        alwaysBounceVertical={false}>
        <LottieView
          source={require('../lotties/animation.json')}
          autoPlay
          loop
          autoSize
        />
        <WelcomeText theme={theme}>{renderWelcomeText()}</WelcomeText>
        <PermissionButton onPress={requestUserGeolocation}>
          <PermissionButtonText theme={theme}>
            {renderWelcomeButtonText()}
          </PermissionButtonText>
        </PermissionButton>
      </ScrollView>
    </Screen>
  );
};

export default WelcomeScreen;
