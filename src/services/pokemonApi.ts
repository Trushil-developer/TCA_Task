import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon list');
  }
}

export async function fetchPokemonDetails(name: String) {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon details');
  }
}
