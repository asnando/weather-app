import React, {useContext} from 'react';
import {
  ScreenContainer,
  CentralizedContentScreenContainer,
} from './Screen.styles';
import themeContext from '../theme';

export const CentralizedContentScreen = () => {
  const {theme} = useContext(themeContext);
  return <CentralizedContentScreenContainer theme={theme} />;
};

export const Screen = ({children}) => {
  const {theme} = useContext(themeContext);
  return <ScreenContainer theme={theme}>{children}</ScreenContainer>;
};
