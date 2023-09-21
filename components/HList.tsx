import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import VMedia from './VMedia';

interface HListProps {
  title: string;
  data: any[];
}

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HListSeperator}
      contentContainerStyle={{
        paddingHorizontal: 30,
      }}
      data={data}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          voteAverage={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
