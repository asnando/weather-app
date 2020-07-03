import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, ActivityIndicator, BackHandler} from 'react-native';
import {Screen} from '../components/Screen';
import {
  CentralizedContent,
  ContentContainer,
  HeaderTitleText,
  BigTitleText,
  DescriptionText,
  WeatherIconContainer,
  WeatherIconImage,
  Section,
  SectionItem,
  SectionItemTitle,
  SectionItemValue,
  RefreshButton,
  RefreshButtonText,
  ForecastContainer,
  Forecast,
  ForecastTitle,
  ForecastMax,
  ForecastMin,
  ForecastIcon,
  ForecastIconImage,
} from './Home.styles';
import {
  getCurrentWeatherByCoordinates,
  getWeatherForecast,
} from '../repository/weather';
import themeContext from '../theme';
import {Weather} from '../repository/type/weather';
import {refreshUserLocation} from '../userLocation';

const HomeScreen = ({navigation}) => {
  const {theme} = useContext(themeContext);
  const lastUserLocation = useSelector((state) => state.lastUserLocation);
  const [failed, setFailed] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  // Temos dois status de carregamento pois a previsão dos próximos dias
  //  é um dado secundário e o clima atual é independente desta informação.
  const [isLoadingForecast, setLoadingForecastStatus] = useState(true);
  const [weather, setWeather] = useState(new Weather());
  const [forecast, setForecast] = useState([]);

  const dispatch = useDispatch();

  const getUserLocationCoords = () => {
    return lastUserLocation;
  };

  // Previne que os usuários de android voltem para a tela de
  // boas-vindas utilizndo o back button do aparelho.
  const preventUserNavigateBack = () => {
    const onBackAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackAction,
    );
    return () => backHandler.remove();
  };

  const onDataError = (error) => {
    console.log(error);
    setFailed(true);
    setLoadingStatus(false);
    setLoadingForecastStatus(false);
  };

  const updateWeather = () => {
    const {latitude, longitude} = getUserLocationCoords();
    getCurrentWeatherByCoordinates(latitude, longitude)
      .then((weatherData) => {
        setWeather(weatherData);
        setLoadingStatus(false);
      })
      .catch(onDataError);
  };

  const updateWeatherForecast = () => {
    setLoadingForecastStatus(true);
    const {latitude, longitude} = getUserLocationCoords();
    getWeatherForecast(latitude, longitude)
      .then(setForecast)
      .then(() => setLoadingForecastStatus(false))
      .catch(console.log);
  };

  // Função chamada pelo botão de atualizar informações da tela.
  // Verifica permissões e coordenadas da localização do usuário
  // e atualização das mesmas.
  const refresh = () => {
    setLoadingStatus(true);
    refreshUserLocation(dispatch);
  };

  // Adiciona handler para bloquear volta de tela por botão físico
  // para os usuários de android, e carrega informações iniciais na tela.
  useEffect(() => {
    preventUserNavigateBack();
    refresh();
  }, []);

  // Usuário clica "Atualizar" -> Permissões e coordenadas da localização são
  // atualizadas na store do redux -> recarrega as informações de clima e previsão.
  useEffect(() => {
    updateWeather();
    updateWeatherForecast();
  }, [lastUserLocation]);

  const renderComponent = (component) => !isLoading && component;
  const renderInfo = (value) => (isLoading || failed ? '-' : value || '');

  const renderForecast = () =>
    isLoadingForecast ? (
      <ActivityIndicator size="large" color={theme.strongTextColor} />
    ) : (
      <ForecastContainer>
        {forecast.map((weatherForecast) => (
          <Forecast>
            <ForecastTitle theme={theme}>
              {weatherForecast.getDate()}
            </ForecastTitle>
            <ForecastIcon>
              <ForecastIconImage source={{uri: weatherForecast.getIcon()}} />
            </ForecastIcon>
            <ForecastMax theme={theme}>
              {weatherForecast.getMaxTemperature()}
            </ForecastMax>
            <ForecastMin theme={theme}>
              {weatherForecast.getMinTemperature()}
            </ForecastMin>
          </Forecast>
        ))}
      </ForecastContainer>
    );

  const renderRefreshButton = () => {
    const isLoadingData = isLoading || isLoadingForecast;
    return (
      <RefreshButton theme={theme} disabled={isLoadingData} onPress={refresh}>
        <RefreshButtonText theme={theme} disabled={isLoadingData}>
          {isLoadingData ? 'Carregando' : 'Atualizar'}
        </RefreshButtonText>
      </RefreshButton>
    );
  };

  return (
    <Screen>
      <>
        <ContentContainer>
          <CentralizedContent>
            <HeaderTitleText theme={theme}>
              {renderInfo(weather.getDate())}
            </HeaderTitleText>
            <DescriptionText theme={theme}>
              {renderInfo(weather.getDescription())}
            </DescriptionText>
            <Section>
              <View style={{flex: 1}}>
                <BigTitleText numberOfLines={2} theme={theme}>
                  {renderInfo(weather.getCity())}
                </BigTitleText>
                <BigTitleText theme={theme}>
                  {renderInfo(weather.getTemperature())}
                </BigTitleText>
              </View>
              <WeatherIconContainer>
                {renderComponent(
                  <WeatherIconImage source={{uri: weather.getIcon()}} />,
                )}
              </WeatherIconContainer>
            </Section>
            <Section>
              <SectionItem>
                <SectionItemTitle theme={theme}>Min</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.getMinTemperature())}
                </SectionItemValue>
              </SectionItem>
              <SectionItem>
                <SectionItemTitle theme={theme}>Max</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.getMaxTemperature())}
                </SectionItemValue>
              </SectionItem>
              <SectionItem>
                <SectionItemTitle theme={theme}>Umidade</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.getHumidity())}
                </SectionItemValue>
              </SectionItem>
              <SectionItem>
                <SectionItemTitle theme={theme}>Vento</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.getWindSpeed())}
                </SectionItemValue>
              </SectionItem>
            </Section>
            {renderForecast()}
            {renderRefreshButton()}
          </CentralizedContent>
        </ContentContainer>
      </>
    </Screen>
  );
};

export default HomeScreen;
