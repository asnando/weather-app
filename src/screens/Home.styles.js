import styled from 'styled-components/native';
import {lighten, darken} from 'polished';

export const ActivityIndicator = styled.ActivityIndicator``;

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
  margin-bottom: 24;
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

export const BottomCard = styled.View`
  bottom: 0;
  width: 100%;
  height: 55%;
  border-top-right-radius: 32;
  border-top-left-radius: 32;
  border-bottom-right-radius: 32;
  border-bottom-left-radius: 32;
  background-color: ${({theme: {primaryColor}}) => darken(0.15, primaryColor)};
`;

export const UpdateDataButton = styled.TouchableOpacity`
  width: 80%;
  height: 64;
  border-radius: 4;
  margin: auto;
  align-items: center;
  justify-content: center;
`;

export const UpdateDataButtonText = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${({disabled, theme: {textColor, disabledTextColor}}) =>
    disabled ? disabledTextColor : textColor};
`;
