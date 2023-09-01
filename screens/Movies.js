import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
  background-color: ${({ theme }) => theme.mainBgColor};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate('Stack', { screen: 'Three' })}>
    <Text>MOVIES</Text>
  </Btn>
);

export default Movies;
