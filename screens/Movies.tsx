import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { Dimensions } from 'react-native';

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const getNowPlaying = () => {
    const url =
      'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer "SOME_API_TOKEN"', // "SOME_API_TOKEN" 부분에 실제 토큰이 들어가야 함
      },
    };

    const result = fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error('error:' + err));

    console.log(result);
  };

  getNowPlaying();

  return (
    <ScrollView>
      <Swiper
        containerStyle={{ width: '100%', height: SCREEN_HIGHT / 4 }}
        loop
        controlsEnabled={false}
        timeout={3.5}>
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'blue' }}></View>
        <View style={{ backgroundColor: 'green' }}></View>
        <View style={{ backgroundColor: 'ivory' }}></View>
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
