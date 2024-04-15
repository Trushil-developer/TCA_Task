import React from 'react';
import { View, FlatList, TextInput, Text, ActivityIndicator } from 'react-native';
import { usePokemonData } from '../../hooks/usePokemonData';
import PokemonItem from '../../components/PokemonItem';
import styles from './HomeScreenStyles';
import Pagination from '../../components/Pagination';


const HomeScreen = () => {
  const { filteredPokemonList, handleSearchChange, txtSearchField, loading, nextPage, prevPage } = usePokemonData();

  return (
    <View style={styles.container}>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.txtSearchField}
          placeholder="Search Pokemons"
          onChangeText={handleSearchChange}
          value={txtSearchField}
        />
      </View>

      {/* Pokemon List*/}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#F7CD46" testID='loader' />
        </View>
      ) :
        filteredPokemonList.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={filteredPokemonList}
              renderItem={({ item }) => <PokemonItem name={item.name} />}
              keyExtractor={(item) => item.name}
              contentContainerStyle={styles.listContainer}
              numColumns={2}
              style={{ marginTop: 70 }}
            />
            <Pagination onNextPage={nextPage} onPrevPage={prevPage} />

          </>
        )}
    </View>
  )
};

export default HomeScreen;

