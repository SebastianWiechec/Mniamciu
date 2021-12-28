import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as firebase from 'firebase';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { theme } from './src/infrastructure/theme';
import { Navigation } from './src/infrastructure/navigation';
import { AuthenticationContextProvider } from './src/services/authentication/AuthenticationContext';

const firebaseConfig = {
  apiKey: 'AIzaSyBZqBqmfgvSILa3OFHkvgwTI_3U2H4WtBk',
  authDomain: 'icespotting.firebaseapp.com',
  projectId: 'icespotting',
  storageBucket: 'icespotting.appspot.com',
  messagingSenderId: '729160709089',
  appId: '1:729160709089:android:7f55c031a5957c4cf258a0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <ThemeProvider theme={theme}>
          <AuthenticationContextProvider>
            <Navigation />
          </AuthenticationContextProvider>
        </ThemeProvider>
        <ExpoStatusBar style="auto" />
      </>
    );
  }
}
