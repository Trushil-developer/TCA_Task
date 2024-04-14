import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { usePokemonSearch } from '../../../hooks/usePokemonSearch';

jest.mock('../../../hooks/usePokemonSearch', () => ({
    usePokemonSearch: jest.fn(),
}));

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        usePokemonSearch.mockReturnValue({
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
        usePokemonSearch.mockReturnValue({
            loading: true,
        });

        render(<HomeScreen />);
        expect(screen.getByTestId('loader')).toBeTruthy();
    });

    it('should render Pockemon list', () => {
        usePokemonSearch.mockReturnValue({
            filteredPokemonList: [{name: 'bulbasaur'}],
        });
        render(<HomeScreen />);
        expect(screen.getByText('bulbasaur')).toBeDefined();
    });
    
    it('should displays no results found on empty array', () => {
        render(<HomeScreen />);
        expect(screen.getByText('No results found')).toBeDefined();
    });
});
