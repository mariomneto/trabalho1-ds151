import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import PokeCard from '../components/PokeCard';
import SearchBar from '../components/SearchBar';
import { POKEMON_NAME_QUERY, POKEMON_QUERY } from '../graphql/queries';
import { PartialPokemon, PartialPokemonData } from '../types/Pokemon';
import { VerticalMargin } from '../util/util';


const Title = styled.Text`
  font-size: 25px;
  margin-left: 5px;
  margin-right: 5px;
  font-family: Arial;
  font-weight: bold;
  color: #21386E;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const PokemonList = styled.FlatList`
  flex-grow: 1;
  margin-top: 10px;
  width: 90%;
  padding-top: 10px;
`;

const HomeScreen = () => {
  const [pokemon, setPokemon] = useState<PartialPokemon[]>([]);
  const [search, setSearch] = useState<string>('');
  const { data } = useQuery<PartialPokemonData>(POKEMON_QUERY);
  const [queryPokemonByName, { data: searchData }] = useLazyQuery<PartialPokemonData>(POKEMON_NAME_QUERY);

  useEffect(() => {
    if(data?.pokemon) {
      setPokemon(data.pokemon);
    }
  }, [data]);

  useEffect(() => {
    queryPokemonByName({ variables: { name: search.toLowerCase() } });
    if(searchData?.pokemon) {
      setPokemon(searchData.pokemon);
    }
  }, [search, searchData]);

  const onSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <Container>
      <VerticalMargin padding={10}>
        <Title>More than 250 Pokemons for you to choose your favorite</Title>
      </VerticalMargin>
      <SearchBar onSearch={(text) => onSearch(text)}/>
      <PokemonList
        data={pokemon}
        renderItem={({ item }) => (
          <PokeCard {...item} id={item.id}/>
        )}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Container>
  );
};

export default HomeScreen;
