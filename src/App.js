import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PersistGate} from 'redux-persist/integration/react';
import HomeScreen from './screens/Home';
import WelcomeScreen from './screens/Welcome';
import {store, persistor} from './state/store';
import themeContext from './theme';

const Stack = createStackNavigator();

const App = () => {
  const {theme} = useContext(themeContext);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={`${theme.appStatusBarStyle}-content`} />
        <NavigationContainer>
          <Stack.Navigator
            headerMode="none"
            initialRouteName="Welcome"
            screenOptions={{gestureEnabled: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
