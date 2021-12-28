import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { RestaurantsScreen } from '../../features/restaurants/screens/RestaurantsScreen';
import { RestaurantDetailScreen } from '../../features/restaurants/screens/RestaurantDetailScreen';
import { PhotoLibrary } from '../../features/restaurants/screens/PhotoLibrary';
import { CameraScreen } from '../../features/restaurants/screens/CameraScreen';

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const headerMode = routeName == 'Camera' ? 'screen' : 'none';

  return (
    <RestaurantStack.Navigator
      headerMode={headerMode}
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
      <RestaurantStack.Screen
        headerMode="screen"
        name="Camera"
        component={CameraScreen}
        options={{ headerMode: 'screen ' }}
      />
      <RestaurantStack.Screen
        headerMode="screen"
        name="PhotoLibrary"
        component={PhotoLibrary}
        options={{ headerMode: 'screen ' }}
      />
    </RestaurantStack.Navigator>
  );
};
