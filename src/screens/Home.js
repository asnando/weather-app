import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {Screen} from '../components/Screen';
import {
  // ActivityIndicator,
  PlaceholderText,
  CentralizedContent,
  ContentContainer,
  HeaderTitleText,
  BigTitleText,
  DescriptionText,
  WeatherIconContainer,
  WeatherIconImage,
  Section,
  BottomCard,
  SectionItem,
  SectionItemTitle,
  SectionItemValue,
  UpdateDataButton,
  UpdateDataButtonText,
} from './Home.styles';
import {getCurrentWeatherByCoordinates} from '../repository/weather';
import themeContext from '../theme';
import {Weather} from '../repository/type/weather';

const HomeScreen = () => {
  const {theme} = useContext(themeContext);
  const lastUserGeolocation = useSelector((state) => state.lastUserGeolocation);
  const [isLoading, setLoadingStatus] = useState(true);
  const [weather, setWeather] = useState(new Weather());

  const updateWeather = () => {
    const {latitude, longitude} = lastUserGeolocation;
    getCurrentWeatherByCoordinates(latitude, longitude)
      .then((weatherData) => {
        setWeather(weatherData);
        setLoadingStatus(false);
      })
      .catch(console.error);
  };

  const updateWeatherData = () => {
    setLoadingStatus(true);
    updateWeather();
  };

  useEffect(() => {
    updateWeather();
  }, []);

  const renderComponent = (component) => !isLoading && component;
  const renderInfo = (value) => (isLoading ? '-' : value || '');

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
          </CentralizedContent>
        </ContentContainer>
        <UpdateDataButton
          theme={theme}
          disabled={isLoading}
          onPress={updateWeatherData}>
          <UpdateDataButtonText theme={theme} disabled={isLoading}>
            Atualizar previsão
          </UpdateDataButtonText>
        </UpdateDataButton>
        {/* <BottomCard theme={theme} /> */}
      </>
    </Screen>
  );
};

export default HomeScreen;
