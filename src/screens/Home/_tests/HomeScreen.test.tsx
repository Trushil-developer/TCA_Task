import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { usePokemonData } from '../../../hooks/usePokemonData';

jest.mock('../../../hooks/usePokemonData', () => ({
    usePokemonData: jest.fn(),
}));

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        usePokemonData.mockReturnValue({
            filteredPokemonList: [],
            handleSearchChange: jest.fn(),
            txtSearchField: '',
            loading: false,
        });
    });

    it('should renders search box correctly', () => {
        const { getByPlaceholderText } = render(<HomeScreen />);
        const searchBox = getByPlaceholderText('Search Pokemons');
        expect(searchBox).toBeDefined();
    });


    it('should displays loader when loading state is true', () => {
        usePokemonData.mockReturnValue({
            loading: true,
        });

        render(<HomeScreen />);
        expect(screen.getByTestId('loader')).toBeTruthy();
    });

    it('should displays no results found on empty array', () => {
        render(<HomeScreen />);
        expect(screen.getByText('No results found')).toBeDefined();
    });
});
