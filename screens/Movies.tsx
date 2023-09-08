import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
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

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Release = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
  width: 80%;
`;

const ComingSoon = styled(ListTitle)`
  margin-bottom: 10px;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
      <ListContainer>
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
              <Votes>
                {movie.vote_average > 0
                  ? `⭐ ${movie.vote_average}`
                  : `Coming soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoon>Coming soon</ComingSoon>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title numberOfLines={1} ellipsizeMode="tail">
              {movie.original_title}
            </Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString('ko-KR', {
                year: '2-digit',
                month: 'short',
                day: '2-digit',
              })}
            </Release>
            <Overview numberOfLines={3} ellipsizeMode="tail">
              {movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

export default Movies;
