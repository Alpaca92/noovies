import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import { FlatList, ScrollView } from 'react-native';
import VMedia from '../components/VMedia';
import HList from '../components/HList';
import { HListSeperator } from './../components/HList';

const Tv = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ['tv', 'today'],
    tvApi.airingToday,
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ['tv', 'trending'],
    tvApi.trending,
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ['tv', 'top'],
    tvApi.topRated,
  );

  const loading = todayLoading || trendingLoading || topLoading;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
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
