import {createContext} from 'react';

const theme = {
  primaryColor: '#FFF',
  textColor: '#404040',
  strongTextColor: 'purple',
};

const themeContext = createContext({theme});

export default themeContext;
