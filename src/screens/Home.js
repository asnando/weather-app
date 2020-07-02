import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Screen} from '../components/Screen';
import {
  ActivityIndicator,
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
} from './Home.styles';
import {getCurrentWeatherByCoordinates} from '../repository/weather';

const HomeScreen = () => {
  const [isLoading, setLoadingStatus] = useState(true);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    // TODO: Get coords from redux here
    getCurrentWeatherByCoordinates(0, 0)
      .then((weatherData) => {
        console.log(weatherData);
        setWeather(weatherData);
        setLoadingStatus(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Screen>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ContentContainer>
            <CentralizedContent>
              <HeaderTitleText>{weather.dateAsString}</HeaderTitleText>
              <DescriptionText>{weather.description}</DescriptionText>
              <Section>
                <View>
                  <BigTitleText>{weather.city}</BigTitleText>
                  <BigTitleText>{weather.temperature}</BigTitleText>
                </View>
                <WeatherIconContainer>
                  <WeatherIconImage source={{uri: weather.icon}} />
                </WeatherIconContainer>
              </Section>
              <Section>
                <SectionItem>
                  <SectionItemTitle>Min</SectionItemTitle>
                  <SectionItemValue>{weather.minTemperature}</SectionItemValue>
                </SectionItem>
                <SectionItem>
                  <SectionItemTitle>Max</SectionItemTitle>
                  <SectionItemValue>{weather.maxTemperature}</SectionItemValue>
                </SectionItem>
                <SectionItem>
                  <SectionItemTitle>Umidade</SectionItemTitle>
                  <SectionItemValue>{weather.humidity}</SectionItemValue>
                </SectionItem>
                <SectionItem>
                  <SectionItemTitle>Vento</SectionItemTitle>
                  <SectionItemValue>{weather.windSpeed}</SectionItemValue>
                </SectionItem>
              </Section>
            </CentralizedContent>
          </ContentContainer>
          <BottomCard />
        </>
      )}
    </Screen>
  );
};

export default HomeScreen;
