import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../../utils/env';

import { CustomText as Text } from '../../../components/CustomText/CustomText';
import { AuthenticationContext } from '../../../services/authentication/AuthenticationContext';

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const InnerSnap = styled(View)`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const CameraScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthenticationContext);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { userPlaceId } = route.params;

  console.log(userPlaceId, 'CameraScreen');

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      await uploadImage(photo.uri, 'bal');
    }
  };

  const uploadImage = async (uri, imageName) => {
    const date = new Date();
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(`${userPlaceId}/` + date.getTime());
    return ref.put(blob);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.back}
    >
      <InnerSnap>
        {/* <TouchableOpacity  /> */}
        <TouchableOpacity
          onPress={snap}
          style={{
            position: 'absolute',
            width: 70,
            height: 70,
            bottom: 0,
            borderRadius: 50,
            backgroundColor: '#fff',
            alignSelf: 'center',
          }}
        />
      </InnerSnap>
    </ProfileCamera>
  );
};
