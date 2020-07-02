import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import IntroductionScreen from './screens/Introduction';
import store from './state/Store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="Introduction" component={IntroductionScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
