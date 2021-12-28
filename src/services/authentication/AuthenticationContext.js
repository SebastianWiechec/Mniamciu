/* eslint-disable prettier/prettier */
import React, { useState, createContext } from 'react';
import * as firebase from 'firebase';

import { loginRequest } from './authentication.service';
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
var db = firebase.firestore();
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userPlaceId, setPlaceId] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      // console.log(usr.uid, 'Auth')
      db.collection('Admins')
        .doc(usr.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.data()) {
            setPlaceId(querySnapshot.data().place_id);
          }
        });
      setUser(usr);
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        db.collection('Admins')
          .doc(u.user.uid)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.data()) {
              setPlaceId(querySnapshot.data().place_id);
            }
          });

        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        userPlaceId,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
