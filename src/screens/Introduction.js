import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  WelcomeText,
  PermissionButton,
  PermissionButtonText,
} from './Introduction.styles';
import {CentralizedContentScreen} from '../components/Screen';

const IntroductionScreen = ({navigation}) => {
  async function onGeolocationGrant({coords: {latitude, longitude}}) {
    navigation.navigate('Home');
  }

  function onGeolocationPermissionError(error) {
    console.error(error);
  }

  const requestUserGeolocation = () => {
    Geolocation.getCurrentPosition(
      onGeolocationGrant,
      onGeolocationPermissionError,
    );
  };

  return (
    <CentralizedContentScreen>
      <WelcomeText>
        Precisamos ter acesso a sua localização para exibir o clima.
      </WelcomeText>
      <PermissionButton onPress={requestUserGeolocation}>
        <PermissionButtonText>Permitir acesso</PermissionButtonText>
      </PermissionButton>
    </CentralizedContentScreen>
  );
};

export default IntroductionScreen;
