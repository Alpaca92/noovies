import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Dimensions } from 'react-native';
import Slide from '../components/Slide';
import Poster from '../components/Poster';

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  width: 100px;
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.6);
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
    <Container>
      <Swiper
        containerStyle={{
          width: '100%',
          height: SCREEN_HIGHT / 4,
          marginBottom: 30,
        }}
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
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 30,
        }}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title numberOfLines={1} ellipsizeMode="tail">
              {movie.original_title}
            </Title>
            <Votes>⭐ {movie.vote_average}</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};

export default Movies;
