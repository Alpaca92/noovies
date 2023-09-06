import React from 'react';
import styled from 'styled-components/native';
import { makeImagePath } from '../utils';
import { BlurView } from 'expo-blur';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Poster from './Poster';

const BgImg = styled.Image``;

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

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}: SlideProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(backdropPath) }}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        tint={isDark ? 'dark' : 'light'}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle}</Title>
            {voteAverage > 0 ? <Votes>⭐ {voteAverage} / 10</Votes> : null}
            <Overview numberOfLines={3} ellipsizeMode="tail">
              {overview}
            </Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
