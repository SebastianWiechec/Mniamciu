/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

import { RestaurantCardCover } from '../components/RestaurantInfoCard.styles';

import * as firebase from 'firebase';
import { firebaseConfig } from '../../../utils/env';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const PhotoLibrary = ({ route }) => {
  const [photos, setPhotos] = useState([]);

  const { userPlaceId } = route.params;

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
        // console.log('Finished listing');
      });
    };

    if (photos.length == 0) {
      fetchData();
    }
  }, []);

  console.log(photos, 'photos');
  //console.log(photos.length, 'photos');

  if (photos.length) {
    return (
      <FlatList
        data={photos}
        initialNumToRender={4}
        removeClippedSubviews={true} // Unmount components when outside of window
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={5} // Reduce the window size
        renderItem={({ item, index }) => (
          <RestaurantCardCover key={index} source={{ uri: item }} />
        )}
      />
    );
  } else {
    return (
      <View
        style={{
          flex: 6,
          alignSelf: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Jeszcze nie ma żadnych zdjęć</Text>
      </View>
    );
  }
};
