import styled from 'styled-components/native';
import {lighten, darken} from 'polished';

export const PlaceholderText = styled.Text`
  font-size: 16;
  margin-top: 16;
  margin-bottom: 16;
`;

export const ContentContainer = styled.ScrollView`
  width: 100%;
`;

export const CentralizedContent = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: 32;
  margin-left: 24;
  margin-right: 24;
`;

export const HeaderTitleText = styled.Text`
  font-size: 24;
  margin-top: 16;
  color: ${({theme: {textColor}}) => textColor};
`;

export const BigTitleText = styled.Text`
  font-weight: bold;
  font-size: 32;
  color: ${({theme: {strongTextColor}}) => strongTextColor};
`;

export const DescriptionText = styled.Text`
  font-size: 24;
  margin-top: 16;
  margin-bottom: 24;
  font-weight: bold;
  color: ${({theme: {strongTextColor}}) => strongTextColor};
`;

export const WeatherIconContainer = styled.View`
  height: 128;
  width: 128;
`;

export const WeatherIconImage = styled.Image`
  flex: 1;
`;

export const Section = styled.View`
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 16;
  margin-bottom: 16;
`;

export const SectionItem = styled.View`
  align-items: center;
`;

export const SectionItemTitle = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${({theme: {strongTextColor}}) => strongTextColor};
`;

export const SectionItemValue = styled.Text`
  font-size: 16;
  color: ${({theme: {textColor}}) => textColor};
`;


export const RefreshButton = styled.TouchableOpacity`
  width: 90%;
  height: 64;
  border-radius: 4;
  margin: auto;
  margin-top: 16;
  align-items: center;
  justify-content: center;
  background-color: ${({theme: {primaryColor}}) => lighten(0.025, primaryColor)};
`;

export const RefreshButtonText = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${({disabled, theme: {textColor, disabledTextColor}}) =>
    disabled ? disabledTextColor : textColor};
`;

export const ForecastContainer = styled.View`
  margin-top: 32;
`;

export const Forecast = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 16;
  padding-bottom: 16;
`;

export const ForecastTitle = styled.Text`
  font-weight: bold;
  font-size: 18;
  color: ${({theme: {strongTextColor}}) => strongTextColor};
  flex: 4;
`;

export const ForecastMax = styled.Text`
  font-size: 16;
  flex: 1;
  color: ${({theme: {strongTextColor}}) => strongTextColor};
`;

export const ForecastMin = styled.Text`
  font-size: 16;
  flex: 1;
  color: ${({theme: {softTextColor}}) => softTextColor};
`;

export const ForecastIcon = styled.View`
  width: 32;
  height: 32;
  margin-right: 16;
`;

export const ForecastIconImage = styled.Image`
  flex: 1;
`;
