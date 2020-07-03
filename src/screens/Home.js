import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
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

const HomeScreen = () => {
  const {theme} = useContext(themeContext);
  const lastUserGeolocation = useSelector((state) => state.lastUserGeolocation);
  const [isLoading, setLoadingStatus] = useState(true);
  // Temos dois status de carregamento pois a previsão dos próximos dias
  //  é um dado secundário e o clima atual independente desta informação.
  const [isLoadingForecast, setLoadingForecastStatus] = useState(true);
  const [weather, setWeather] = useState(new Weather());
  const [forecast, setForecast] = useState([]);

  const updateWeather = () => {
    const {latitude, longitude} = lastUserGeolocation;
    getCurrentWeatherByCoordinates(latitude, longitude)
      .then((weatherData) => {
        setWeather(weatherData);
        setLoadingStatus(false);
      })
      .catch(console.log);
  };

  const updateWeatherForeacast = () => {
    setLoadingForecastStatus(true);
    const {latitude, longitude} = lastUserGeolocation;
    getWeatherForecast(latitude, longitude)
      .then(setForecast)
      .then(() => setLoadingForecastStatus(false))
      .catch(console.log);
  };

  const updateWeatherData = () => {
    setLoadingStatus(true);
    updateWeather();
    updateWeatherForeacast();
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

  useEffect(() => {
    preventUserNavigateBack();
    updateWeatherData();
  }, []);

  const renderComponent = (component) => !isLoading && component;
  const renderInfo = (value) => (isLoading ? '-' : value || '');

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
              {weatherForecast.getMinTemperature()}
            </ForecastMax>
            <ForecastMin theme={theme}>
              {weatherForecast.getMaxTemperature()}
            </ForecastMin>
          </Forecast>
        ))}
      </ForecastContainer>
    );

    const renderRefreshButton = () => (
      <RefreshButton
        theme={theme}
        disabled={isLoading}
        onPress={updateWeatherData}>
        <RefreshButtonText theme={theme} disabled={isLoading}>
          {isLoading ? 'Carregando' : 'Atualizar'}
        </RefreshButtonText>
      </RefreshButton>
    );

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
