import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { fetchPokemonDetails } from '../../services/pokemonApi';
import { RouteProp } from '@react-navigation/native';
import styles from './DetailScreenStyles';
import DetailRow from '../../components/DetailRow';
import ErrorMessage from '../../components/ErrorMessage';

type RootStackParamList = {
  Details: { pokemon: string };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailScreenProps = {
  route: DetailScreenRouteProp;
};

type PokemonDetails = {
  name?: string;
  types?: { type: { name: string } }[];
  height?: number;
  weight?: number;
  abilities?: { ability: { name: string } }[];
  sprites?: { front_default?: string };
};

const DetailScreen = ({ route }: DetailScreenProps) => {
  const { pokemon } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchPokemonDetails(pokemon);
        setPokemonDetails(details);
        setError(null);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error.message);
        setError('Failed to fetch Pokémon details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [pokemon]);


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#E63F34" testID='loading-indicator'/>
      ) : error ? (
        <ErrorMessage message={error} />
      ): pokemonDetails && (
        <>
          <View style={styles.topHalf}>
            <Image
              style={styles.image}
              source={{
                uri: pokemonDetails.sprites?.front_default || 'https://example.com/placeholder.png',
              }}
            />
          </View>
          <View style={styles.bottomHalf}>
            <ScrollView>
              <View style={styles.tableContainer}>
                <DetailRow label="Name" value={pokemonDetails.name} />
                <DetailRow label="Type" value={pokemonDetails.types.map((type) => type.type.name).join(', ')} />
                <DetailRow label="Height" value={pokemonDetails.height} />
                <DetailRow label="Weight" value={pokemonDetails.weight} />
                <DetailRow
                  label="Abilities"
                  value={pokemonDetails.abilities.map((ability) => ability.ability.name).join(', ')}
                />
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};



export default DetailScreen;
