import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import Store from './src/store/app.store';
import {Provider} from 'react-redux';
import {ThemeContextProvider} from './src/store/contexts/ThemeContexts';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackNavigator from './src/navigation/StackNavigator';


const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <Provider store={Store}>
      <ThemeContextProvider>
        {Platform.OS == 'ios' ? <StatusBar barStyle="dark-content" /> : null}
        <NavigationContainer>
        <StackNavigator />
        </NavigationContainer>
      </ThemeContextProvider>
    </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
