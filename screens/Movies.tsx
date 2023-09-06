import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from 'react-native';
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

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  flex-direction: column;
  margin-left: 15px;
  width: 40%;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const isDark = useColorScheme() === 'dark';
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
        horizontal
        showsButtons={false}
        showsPagination={false}
        autoplayTimeout={3.5}
      >
        {nowPlayingMovies.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImagePath(movie.backdrop_path) }}
            />
            <BlurView
              style={StyleSheet.absoluteFill}
              tint={isDark ? 'dark' : 'light'}
            >
              <Wrapper>
                <Poster source={{ uri: makeImagePath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Overview numberOfLines={3} ellipsizeMode="tail">
                    {movie.overview}
                  </Overview>
                  {movie.vote_average > 0 ? (
                    <Votes>⭐ {movie.vote_average} / 10</Votes>
                  ) : null}
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
