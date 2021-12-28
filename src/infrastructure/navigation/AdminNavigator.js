import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { AdminScreen } from '../../features/admin/screens/AdminScreen';
import { MenuScreen } from '../../features/admin/screens/MenuScreen';
import { RestaurantScreen } from '../../features/admin/screens/RestaurantScreen';

const SettingsStack = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{ header: () => null }}
        name="Admin"
        component={AdminScreen}
      />
      <SettingsStack.Screen name="Menu" component={MenuScreen} />
      <SettingsStack.Screen name="Restaurant" component={RestaurantScreen} />
    </SettingsStack.Navigator>
  );
};
