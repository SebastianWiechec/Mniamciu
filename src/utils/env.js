/* eslint-disable no-unused-vars */
import { Platform } from 'react-native';

// localHost URL will not work on Android device in development mode due to
// Firebase emulators being served on a non-secure 'http' URL (i.e: not 'https://...').

// To test on Android device in development mode, liveHost URL will be used instead.

const liveHost = 'https://us-central1-icespotting.cloudfunctions.net';
//const liveHost =
// 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=ice-cream&location=51.207067,16.23309876&radius=1000&key=AIzaSyBZqBqmfgvSILa3OFHkvgwTI_3U2H4WtBk';
const localHost = 'http://localhost:5001/yummeals-e8d3d/us-central1'; // do zmiany

export const isAndroid = Platform.OS === 'android';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isMock = false; // Change isMock to true during development to limit API requests to Google
//export const host = !isDevelopment || isAndroid ? liveHost : localHost;
export const host = liveHost;

export const firebaseConfig = {
  apiKey: 'AIzaSyBZqBqmfgvSILa3OFHkvgwTI_3U2H4WtBk',
  authDomain: 'icespotting.firebaseapp.com',
  projectId: 'icespotting',
  storageBucket: 'icespotting.appspot.com',
  messagingSenderId: '729160709089',
  appId: '1:729160709089:android:7f55c031a5957c4cf258a0',
};
