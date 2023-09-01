import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stack from './Stack';

const RootNavigation = createNativeStackNavigator();

const Root = () => (
  <RootNavigation.Navigator
    screenOptions={{ headerShown: false, presentation: 'modal' }}>
    <RootNavigation.Screen
      name='Tabs'
      component={Tabs}
    />
    <RootNavigation.Screen
      name='Stack'
      component={Stack}
    />
  </RootNavigation.Navigator>
);

export default Root;
