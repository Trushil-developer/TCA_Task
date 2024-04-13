import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { fetchPokemonList } from '../services/pokemonApi';
import PokemonItem from '../components/PokemonItem';

const HomeScreen = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemonList(data.results);
      } catch (error: any) {
        console.error('Error fetching Pokemon list:', error.message);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => <PokemonItem name={item.name} />}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415FA6',
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
});

export default HomeScreen;
