import axios from 'axios';
import { usePokemonData } from '../usePokemonData';
import { act, renderHook, waitFor } from '@testing-library/react-native';

jest.mock('axios');

describe('usePokemonData', () => {
    // Mock data for testing
    const mockPokemonList = {
        results: [
            { name: 'bulbasaur' },
            { name: 'ivysaur' },
            { name: 'venusaur' },
        ],
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    };

    // Setting up axios mock response
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockPokemonList });
    });

    it('fetches Pokemon data on initial render', async () => {
        const { result } = renderHook(() => usePokemonData());
        await waitFor(() => !result.current.loading);

        expect(result.current.filteredPokemonList).toEqual(mockPokemonList.results);
        expect(result.current.nextPage).toEqual(expect.any(Function));
        expect(result.current.prevPage).toEqual(expect.any(Function));
    });

    it('loads next page of Pokemon data', async () => {
        const { result } = renderHook(() => usePokemonData());
        await waitFor(() => !result.current.loading);

        const nextMockPokemonList = {
            results: [
                { name: 'charmander' },
                { name: 'charmeleon' },
                { name: 'charizard' },
            ],
            next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
            previous: null,
        };

        axios.get.mockResolvedValueOnce({ data: nextMockPokemonList });
        act(() => {
            result.current.nextPage();
        });

        await waitFor(() => !result.current.loading);
        expect(axios.get).toHaveBeenCalledWith(mockPokemonList.next);
        expect(result.current.filteredPokemonList).toEqual(nextMockPokemonList.results);
        expect(result.current.nextPage).toEqual(expect.any(Function));
        expect(result.current.prevPage).toBe(null);
    });

    it('loads previous page of Pokemon data', async () => {
        const { result } = renderHook(() => usePokemonData());
        await waitFor(() => !result.current.loading);

        const prevMockPokemonList = {
            results: [
                { name: 'charmander' },
                { name: 'charmeleon' },
                { name: 'charizard' },
            ],
            next: null,
            previous: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        };

        axios.get.mockResolvedValueOnce({ data: prevMockPokemonList });
        act(() => {
            result.current.prevPage();
        });

        await waitFor(() => !result.current.loading);
        expect(axios.get).toHaveBeenCalledWith(mockPokemonList.previous);
        expect(result.current.filteredPokemonList).toEqual(prevMockPokemonList.results);
        expect(result.current.nextPage).toBe(null);
        expect(result.current.prevPage).toEqual(expect.any(Function));
    });

    it('handles search field change', async () => {
        const { result } = renderHook(() => usePokemonData());
        await waitFor(() => !result.current.loading);

        act(() => {
            result.current.handleSearchChange('bul');
        });

        expect(result.current.txtSearchField).toBe('bul');
        expect(result.current.filteredPokemonList).toEqual([{ name: 'bulbasaur' }]);
    });
});
