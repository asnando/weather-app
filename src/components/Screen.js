import React, {useContext} from 'react';
import {
  ScreenContainer,
  CentralizedContentScreenContainer,
} from './Screen.styles';
import themeContext from '../theme';

export const CentralizedContentScreen = ({ children }) => {
  const {theme} = useContext(themeContext);
  return (
    <CentralizedContentScreenContainer theme={theme}>
      {children}
    </CentralizedContentScreenContainer>
  );
};

export const Screen = ({children}) => {
  const {theme} = useContext(themeContext);
  return <ScreenContainer theme={theme}>{children}</ScreenContainer>;
};
