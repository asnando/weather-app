import styled from 'styled-components/native';
import {lighten} from 'polished';

export const ActivityIndicator = styled.ActivityIndicator`
  width: 24;
  height: 24;
`;

export const ContentContainer = styled.ScrollView`
  width: 100%;
`;

export const CentralizedContent = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: 32;
`;

export const HeaderTitleText = styled.Text`
  font-size: 24;
  margin-top: 16;
`;

export const BigTitleText = styled.Text`
  font-weight: bold;
  font-size: 32;
`;

export const DescriptionText = styled.Text`
  font-size: 24;
  margin-top: 16;
  font-weight: bold;
`;

export const WeatherIconContainer = styled.View`
  width: 128;
  height: 128;
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
`;

export const SectionItemValue = styled.Text`
  font-size: 16;
`;

// TODO: configurar a cor baseado no tema
export const BottomCard = styled.View`
  bottom: 0;
  width: 100%;
  height: 55%;
  border-top-right-radius: 32;
  border-top-left-radius: 32;
  border-bottom-right-radius: 32;
  border-bottom-left-radius: 32;
  background-color: ${lighten(0.15, '#fcd433')};
`;
