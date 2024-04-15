import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokemonApi';

type Pokemon = {
    name: string;
};

export const usePokemonData = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [txtSearchField, setSearchField] = useState<string>('');

    useEffect(() => {
        fetchPokemons('https://pokeapi.co/api/v2/pokemon');
    }, []);

    const fetchPokemons = async (url: string) => {
        try {
            setLoading(true);
            const data = await fetchPokemonList(url);
            setPokemonList(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
        } catch (error: any) {
            console.error('Error fetching Pokemon list:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadNextPage = () => {
        if (nextPage) {
            fetchPokemons(nextPage);
        }
    };

    const loadPrevPage = () => {
        if (prevPage) {
            fetchPokemons(prevPage);
        }
    };
    const handleSearchChange = (value: string) => {
        setSearchField(value);
    };
    return {
        filteredPokemonList: pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(txtSearchField.toLowerCase())
        ),
        handleSearchChange,
        txtSearchField, loading, nextPage: nextPage ? loadNextPage : null, prevPage: prevPage ? loadPrevPage : null
    };
};
