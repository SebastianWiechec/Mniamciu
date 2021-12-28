/* eslint-disable no-unused-vars */
import React, { useContext, useState, useCallback } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { Spacer } from '../../../components/Spacer/Spacer';
import { CustomText as Text } from '../../../components/CustomText/CustomText';
import { colors } from '../../../infrastructure/theme/colors';

import { AuthenticationContext } from '../../../services/authentication/AuthenticationContext';

const SettingsBackground = styled(ImageBackground).attrs({
  source: require('../../../../assets/images/homepage_bg.jpg'),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

const AvatarContainer = styled(View)`
  align-items: center;
`;

export const AdminScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <SettingsBackground>
      <TransparentSafeArea>
        <AvatarContainer>
          <Spacer position="top" size="large">
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </AvatarContainer>
        <List.Section>
          <SettingsItem
            title="Restaurant"
            description="View your restaurant"
            onPress={() => navigation.navigate('Restaurant')}
            left={(props) => (
              <List.Icon {...props} color={colors.ui.error} icon="food" />
            )}
          />
          <Spacer />
          <SettingsItem
            title="Menu"
            description="View your menu"
            onPress={() => navigation.navigate('Menu')}
            left={(props) => (
              <List.Icon {...props} color={colors.ui.error} icon="ice-cream" />
            )}
          />
          <Spacer />
        </List.Section>
      </TransparentSafeArea>
    </SettingsBackground>
  );
};
