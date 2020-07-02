import React from 'react';
import {
  ScreenContainer,
  CentralizedContentScreenContainer,
} from './Screen.styles';

export const CentralizedContentScreen = CentralizedContentScreenContainer;

export const Screen = ({children}) => (
  <ScreenContainer>{children}</ScreenContainer>
);
