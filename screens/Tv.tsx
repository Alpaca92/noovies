import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import { RefreshControl, ScrollView } from 'react-native';
import HList from '../components/HList';

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(['tv', 'today'], tvApi.airingToday);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(['tv', 'trending'], tvApi.trending);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(['tv', 'top'], tvApi.topRated);

  const onRefresh = async () => {
    queryClient.refetchQueries(['tv']);
  };
  const loading = todayLoading || trendingLoading || topLoading;
  const refreshing = todayRefetching || trendingRefetching || topRefetching;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        paddingVertical: 20,
      }}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
