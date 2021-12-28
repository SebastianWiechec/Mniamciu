/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { List, Divider, TextInput, Card } from 'react-native-paper';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { Spacer } from '../../../components/Spacer/Spacer';
import { RestaurantInfoCard } from '../components/RestaurantInfoCard';

import { RestaurantCardCover } from '../components/RestaurantInfoCard.styles';

import * as firebase from 'firebase';
import { firebaseConfig } from '../../../utils/env';
import { set } from 'react-native-reanimated';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const PhotoLibrary = ({ route, navigation }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);

  const [icecreams, setIcecreams] = useState([]);
  const [milkshake, setMilkshake] = useState([]);
  const [photos, setPhotos] = useState([]);

  const { userPlaceId } = route.params;

  var db = firebase.firestore();

  useEffect(() => {
    const fetchData = async () => {
      let photosUrls = [];
      const listFilesAndDirectories = async (reference, pageToken) => {
        return reference.list({ pageToken }).then(async (result) => {
          // Loop over each item
          //   console.log(result.items)
          for (let ref of result.items) {
            let url = await ref.getDownloadURL();
            photosUrls.push(url);
          }

          //setPhotos(photosUrls)

          if (result.nextPageToken) {
            return await listFilesAndDirectories(
              reference,
              result.nextPageToken
            );
          }

          return Promise.resolve();
        });
      };

      var ref = firebase.storage().ref().child(`${userPlaceId}`);

      await listFilesAndDirectories(ref).then(() => {
        setPhotos(photosUrls);
        console.log('Finished listing');
      });
    };

    if (photos.length == 0) {
      fetchData();
    }
  }, []);

  console.log(photos, 'photos');
  //console.log(photos.length, 'photos');

  return (
    <ScrollView>
      {photos.map((el, key) => (
        <RestaurantCardCover key={key} source={{ uri: el }} />
      ))}
    </ScrollView>
  );
};
