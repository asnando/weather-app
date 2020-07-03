import styled from 'styled-components/native';

export const WelcomeText = styled.Text`
  width: 80%;
  margin-top: 16;
  margin-bottom: 16;
  font-size: 20;
  color: ${({theme: {textColor}}) => textColor};
`;

export const PermissionButton = styled.TouchableOpacity`
  margin-top: 16;
  padding-top: 16;
  padding-right: 16;
  padding-bottom: 16;
  padding-left: 16;
`;

export const PermissionButtonText = styled.Text`
  font-size: 24;
  font-weight: bold;
  color: ${({theme: {strongTextColor}}) => strongTextColor};
`;
