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

const HomeScreen = () => {
  const {theme} = useContext(themeContext);
  const lastUserGeolocation = useSelector((state) => state.lastUserGeolocation);
  const [isLoading, setLoadingStatus] = useState(true);
  const [weather, setWeather] = useState({});

  const updateWeatherData = () => alert('not implemented');

  useEffect(() => {
    const {latitude, longitude} = lastUserGeolocation;
    getCurrentWeatherByCoordinates(latitude, longitude)
      .then((weatherData) => {
        console.log(weatherData);
        setWeather(weatherData);
        setLoadingStatus(false);
      })
      .catch(console.error);
  }, []);

  const renderComponent = (component) => !isLoading && component;
  const renderInfo = (value) => (isLoading ? '-' : value || '');

  return (
    <Screen>
      <>
        <ContentContainer>
          <CentralizedContent>
            <HeaderTitleText theme={theme}>
              {renderInfo(weather.dateAsString)}
            </HeaderTitleText>
            <DescriptionText theme={theme}>
              {renderInfo(weather.description)}
            </DescriptionText>
            <Section>
              <View style={{flex: 1}}>
                <BigTitleText numberOfLines={2} theme={theme}>
                  {renderInfo(weather.city)}
                </BigTitleText>
                <BigTitleText theme={theme}>
                  {renderInfo(weather.temperature)}
                </BigTitleText>
              </View>
              <WeatherIconContainer>
                {renderComponent(
                  <WeatherIconImage source={{uri: weather.icon}} />,
                )}
              </WeatherIconContainer>
            </Section>
            <Section>
              <SectionItem>
                <SectionItemTitle theme={theme}>Min</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.minTemperature)}
                </SectionItemValue>
              </SectionItem>
              <SectionItem>
                <SectionItemTitle theme={theme}>Max</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.maxTemperature)}
                </SectionItemValue>
              </SectionItem>
              <SectionItem>
                <SectionItemTitle theme={theme}>Umidade</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.humidity)}
                </SectionItemValue>
              </SectionItem>
              <SectionItem>
                <SectionItemTitle theme={theme}>Vento</SectionItemTitle>
                <SectionItemValue theme={theme}>
                  {renderInfo(weather.windSpeed)}
                </SectionItemValue>
              </SectionItem>
            </Section>
          </CentralizedContent>
        </ContentContainer>
        <UpdateDataButton theme={theme}>
          <UpdateDataButtonText theme={theme} onPress={updateWeatherData}>
            Atualizar previsão
          </UpdateDataButtonText>
        </UpdateDataButton>
        {/* <BottomCard theme={theme} /> */}
      </>
    </Screen>
  );
};

export default HomeScreen;
