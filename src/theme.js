import {createContext} from 'react';

const theme = {
  primaryColor: 'rgb(77,112,242)',
  textColor: '#eee',
  strongTextColor: '#fff',
  appStatusBarStyle: 'light',
};

const themeContext = createContext({theme});

export default themeContext;
