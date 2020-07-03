import {createContext} from 'react';

const theme = {
  primaryColor: 'rgb(77,112,242)',
  textColor: '#eee',
  strongTextColor: '#fff',
  softTextColor: '#ccc',
  disabledTextColor: 'rgba(255,255,255,0.3)',
  appStatusBarStyle: 'light',
};

const themeContext = createContext({theme});

export default themeContext;
