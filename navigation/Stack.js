import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity
    onPress={() =>
      setOptions({
        title: 'Changed title !',
      })
    }>
    <Text>Change Title</Text>
  </TouchableOpacity>
);

const NativeStack = createStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      animation: 'fade',
    }}>
    <NativeStack.Screen
      name='One'
      component={ScreenOne}
    />
    <NativeStack.Screen
      name='Two'
      component={ScreenTwo}
    />
    <NativeStack.Screen
      name='Three'
      component={ScreenThree}
    />
  </NativeStack.Navigator>
);

export default Stack;
