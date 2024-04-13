import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokemonApi';

type Pokemon = {
  name: string;
};

export const usePokemonSearch = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [txtSearchField, setSearchField] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //API call to fetch PokemonList
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList();
        setPokemonList(data.results);
      } catch (error: any) {
        console.error('Error fetching Pokemon list:', error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchPokemons();
  }, []);

  //Search Box
  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(txtSearchField.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchField(value);
  };

  return {
    filteredPokemonList,
    handleSearchChange,
    txtSearchField,
    loading
  };
};
