import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Dimensions } from 'react-native';
import Slide from '../components/Slide';

const ScrollView = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNowPlaying = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR';
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
  };

  const getUpcoming = async () => {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?language=ko-KR';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmI5Yjc5YWI1MWYxZTNkNjgyMGZkZDVmZWRhNmEzZSIsInN1YiI6IjYyMGRlNDNkZjc5NGFkMDA0MjQzMGVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iq3ANuPSRpYIYQgtlPGAp0QjCaooNrrNdqhw3gZjyw8',
      },
    };

    const { results } = await (await fetch(url, options)).json();

    setUpcoming(results);
  };

  const getTrending = async () => {
    const url =
      'https://api.themoviedb.org/3/trending/movie/week?language=ko-KR';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmI5Yjc5YWI1MWYxZTNkNjgyMGZkZDVmZWRhNmEzZSIsInN1YiI6IjYyMGRlNDNkZjc5NGFkMDA0MjQzMGVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iq3ANuPSRpYIYQgtlPGAp0QjCaooNrrNdqhw3gZjyw8',
      },
    };

    const { results } = await (await fetch(url, options)).json();

    setTrending(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
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
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
