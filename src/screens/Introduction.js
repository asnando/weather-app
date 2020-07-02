import React from 'react';
import {useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {
  WelcomeText,
  PermissionButton,
  PermissionButtonText,
} from './Introduction.styles';
import {CentralizedContentScreen} from '../components/Screen';
import {saveUserCoords} from '../state/Actions';

const IntroductionScreen = ({navigation}) => {
  const dispatch = useDispatch();

  async function onGeolocationGrant({coords: {latitude, longitude}}) {
    dispatch(saveUserCoords(latitude, longitude));
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
