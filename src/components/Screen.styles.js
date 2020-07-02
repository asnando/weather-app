import styled from 'styled-components/native';

export const ScreenContainer = styled.SafeAreaView`
  background-color: ${({theme: {primaryColor}}) => primaryColor};
  flex: 1;
`;

export const CentralizedContentScreenContainer = styled.SafeAreaView`
  background-color: ${({theme: {primaryColor}}) => primaryColor};
  flex: 1;
  align-items: center;
  justify-content: center;
`;
