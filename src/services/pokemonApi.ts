import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList() {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon list');
  }
}

export async function fetchPokemonDetails(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon details');
  }
}
