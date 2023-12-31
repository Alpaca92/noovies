import React, { useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  width: 90%;
  margin: 10px auto;
  border-radius: 15px;
  padding: 10px 15px;
`;

const Search = () => {
  const [query, setQuery] = useState('');

  const onChangeText = (text: string) => {
    setQuery(text);
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyLabel="Search"
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Search;
