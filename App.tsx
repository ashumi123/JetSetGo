import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import FlightScreen from './src/Screens/Flight/index';
import {persistor,store}from './store'
import { Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {

  return (
    <>
      {Platform.OS == 'ios' && <SafeAreaView />}
      <Provider store={store}>
      <PersistGate persistor={persistor}>
     <FlightScreen/>
     </PersistGate>
     </Provider>
    </>
  );
};


export default App;

