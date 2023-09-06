import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { makeImagePath } from '../utils';
import { BlurView } from 'expo-blur';

const ScrollView = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const Title = styled.Text``;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNowPlaying = async () => {
    const url =
      'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmI5Yjc5YWI1MWYxZTNkNjgyMGZkZDVmZWRhNmEzZSIsInN1YiI6IjYyMGRlNDNkZjc5NGFkMDA0MjQzMGVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iq3ANuPSRpYIYQgtlPGAp0QjCaooNrrNdqhw3gZjyw8',
      },
    };

    const { results } = await (await fetch(url, options)).json();

    setNowPlayingMovies(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        containerStyle={{ width: '100%', height: SCREEN_HIGHT / 4 }}
        loop
        controlsEnabled={false}
        timeout={3.5}>
        {nowPlayingMovies.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImagePath(movie.backdrop_path) }}
            />
            <BlurView style={StyleSheet.absoluteFill}>
              <Title>{movie.original_title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
