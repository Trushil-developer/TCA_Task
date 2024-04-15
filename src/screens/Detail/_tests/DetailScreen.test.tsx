import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DetailScreen from '../DetailScreen';
import { fetchPokemonDetails } from '../../../services/pokemonApi';

jest.mock('../../../services/pokemonApi', () => ({
    fetchPokemonDetails: jest.fn(),
}));

describe('DetailScreen', () => {
    beforeAll(() => {
        jest.resetAllMocks();
    })
    it('should renders loading indicator while fetching data', async () => {
        fetchPokemonDetails.mockResolvedValueOnce({
            name: 'Pikachu',
            types: [{ type: { name: 'Electric' } }],
            height: 40,
            weight: 60,
            abilities: [{ ability: { name: 'Static' } }],
            sprites: { front_default: 'https://example.com/pikachu.png' },
        });

        const { queryByTestId } = render(<DetailScreen route={{ params: { pokemon: 'pikachu' } }} />);

        const loadingIndicator = queryByTestId('loading-indicator');
        expect(loadingIndicator).toBeDefined();

        await waitFor(() => expect(fetchPokemonDetails).toHaveBeenCalledTimes(1));

        expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('should renders details after data is fetched', async () => {
        fetchPokemonDetails.mockResolvedValueOnce({
            name: 'Pikachu',
            types: [{ type: { name: 'Electric' } }],
            height: 40,
            weight: 60,
            abilities: [{ ability: { name: 'Static' } }],
            sprites: { front_default: 'https://example.com/pikachu.png' },
        });

        const { getByText, queryByText } = render(<DetailScreen route={{ params: { pokemon: 'pikachu' } }} />);

        await waitFor(() => {
            expect(getByText('Pikachu')).toBeDefined();
            expect(getByText('Electric')).toBeDefined();
            expect(getByText('40')).toBeDefined();
            expect(getByText('60')).toBeDefined();
            expect(getByText('Static')).toBeDefined();
            expect(queryByText('Failed to fetch Pokémon details')).toBeNull();
        });
    });

    it('should renders error message if fetching data fails', async () => {
        fetchPokemonDetails.mockRejectedValueOnce(new Error('Failed to fetch data'));

        const { queryByTestId, getByText } = render(<DetailScreen route={{ params: { pokemon: 'pikachu' } }} />);

        const loadingIndicator = queryByTestId('loading-indicator');
        expect(loadingIndicator).toBeDefined();

        await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

        expect(getByText('Failed to fetch Pokémon details')).toBeDefined();
    });

});
