/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {
  WelcomeText,
  PermissionButton,
  PermissionButtonText,
} from './Welcome.styles';
import {Screen} from '../components/Screen';
import {
  USER_LOCATION_PERMISSION_UNKNOWN,
  USER_LOCATION_PERMISSION_DENIED,
  USER_LOCATION_PERMISSION_GRANTED,
} from '../constants';
import themeContext from '../theme';
import {requestUserLocationPermission} from '../userLocation';

const WelcomeScreen = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const dispatch = useDispatch();

  const userLocationPermissionStatus = useSelector(
    (state) => state.userLocationPermissionStatus,
  );

  const goToNextPage = () => navigation.navigate('Home');

  // Esta função pode ser chamada em dois momentos distintos:
  //  - O usuário clica no botão para permitir acesso à sua localização
  //  - O usuário já permitiu acesso à sua lozalização anteriormente, porém é necessária
  // uma segunda verificação (sempre que ele reabre o app) à fim de invalidar a permissão
  // caso o usuário tenha alterado as configurações do apareho.
  const requestUserLocation = (showAnimation = false) => {
    requestUserLocationPermission(dispatch, () => {
      // Após permissão de acesso à localização o usuário será redirecionado
      // para a tela principal do app. Se o usuário já forneceu permissão
      // e o mesmo está reabrindo o app com uma permissão ainda ativa seram
      // apresentados alguns segundos da animação desta tela.
      setTimeout(goToNextPage, showAnimation ? 2000 : 0);
    });
  };

  useEffect(() => {
    // Mesmo que o app tenha permissão para acessar a localização, tenta atualizar
    // a mesma e previne que o usuário tenha alterado a permissão na configuração do aparelho.
    if (userLocationPermissionStatus === USER_LOCATION_PERMISSION_GRANTED) {
      console.log('Permission already granted, requesting it again!');
      requestUserLocation(true);
    }
  }, []);

  // Como a flag "userLocationPermissionStatus" é compartilhada entre telas e
  // gerenciada pelo redux, caso ela sofra a alteração de status da permissão
  // e o mesmo bloqueie o acesso à localização do usuário, o app retornará
  // à está tela e exibirá a mensagem de sem permissão.
  useEffect(() => {
    if (userLocationPermissionStatus === USER_LOCATION_PERMISSION_DENIED) {
      navigation.navigate('Welcome');
    }
  }, [userLocationPermissionStatus]);

  const renderWelcomeText = () => {
    switch (userLocationPermissionStatus) {
      case USER_LOCATION_PERMISSION_UNKNOWN:
        return 'Precisamos ter acesso a sua localização para exibir as informações de clima.';
      case USER_LOCATION_PERMISSION_DENIED:
        return `Parece que você não permitiu o acesso à sua localização.
Por favor, habilite este acesso nas configurações do aparelho e tente novamente.`;
      case USER_LOCATION_PERMISSION_GRANTED:
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
      case USER_LOCATION_PERMISSION_GRANTED:
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
        <PermissionButton onPress={() => requestUserLocation(false)}>
          <PermissionButtonText theme={theme}>
            {renderWelcomeButtonText()}
          </PermissionButtonText>
        </PermissionButton>
      </ScrollView>
    </Screen>
  );
};

export default WelcomeScreen;
