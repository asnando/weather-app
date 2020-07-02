import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Screen} from '../components/Screen';
import {
  ActivityIndicator,
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

  const renderInfo = (children, width = 100, height = 20) =>
    isLoading ? <PlaceholderText>-</PlaceholderText> : children;

  return (
    <Screen>
      <>
        <ContentContainer>
          <CentralizedContent>
            {renderInfo(
              <HeaderTitleText>{weather.dateAsString}</HeaderTitleText>
            )}
            {renderInfo(
              <DescriptionText>{weather.description}</DescriptionText>
            )}
            <Section>
              <View>
                {renderInfo(<BigTitleText>{weather.city}</BigTitleText>)}
                {renderInfo(<BigTitleText>{weather.temperature}</BigTitleText>)}
              </View>
              <WeatherIconContainer>
                {renderInfo(<WeatherIconImage source={{uri: weather.icon}} />)}
              </WeatherIconContainer>
            </Section>
            <Section>
              <SectionItem>
                <SectionItemTitle>Min</SectionItemTitle>
                {renderInfo(
                  <SectionItemValue>{weather.minTemperature}</SectionItemValue>
                )}
              </SectionItem>
              <SectionItem>
                <SectionItemTitle>Max</SectionItemTitle>
                {renderInfo(
                  <SectionItemValue>{weather.maxTemperature}</SectionItemValue>
                )}
              </SectionItem>
              <SectionItem>
                <SectionItemTitle>Umidade</SectionItemTitle>
                {renderInfo(
                  <SectionItemValue>{weather.humidity}</SectionItemValue>
                )}
              </SectionItem>
              <SectionItem>
                <SectionItemTitle>Vento</SectionItemTitle>
                {renderInfo(
                  <SectionItemValue>{weather.windSpeed}</SectionItemValue>
                )}
              </SectionItem>
            </Section>
          </CentralizedContent>
        </ContentContainer>
        <BottomCard />
      </>
    </Screen>
  );
};

export default HomeScreen;
