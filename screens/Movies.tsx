import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import HMedia from '../components/HMedia';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { moviesApi } from '../api';

const Container = styled.FlatList``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeperator = styled.View`
  width: 20px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(['movies', 'nowPlaying'], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(['movies', 'upcoming'], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(['movies', 'trending'], moviesApi.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(['movies']);
  };

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = (item) => item.id + '';
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      data={upcomingData.results}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: '100%',
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => (
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
              data={trendingData.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={movieKeyExtractor}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeperator}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
    />
  );
};

export default Movies;
