import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import { FlatList, ScrollView } from 'react-native';
import VMedia from '../components/VMedia';

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
    <ScrollView>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trendingData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={todayData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};

export default Tv;
