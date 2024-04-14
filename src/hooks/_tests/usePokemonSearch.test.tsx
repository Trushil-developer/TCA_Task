import { usePokemonSearch } from '../usePokemonSearch';
import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { fetchPokemonList } from '../../services/pokemonApi';

jest.mock('../usePokemonSearch', () => ({
    usePokemonSearch: jest.fn(),
}));

describe('usePokemonSearch', () => {
    beforeAll(() => {
        jest.resetAllMocks()
        usePokemonSearch.mockReturnValue({
            filteredPokemonList: [],
            handleSearchChange: jest.fn(),
            txtSearchField: '',
            loading: false,
        });
    })

    it('should returns initial state', () => {
        const { result } = renderHook(() => usePokemonSearch());
        expect(result.current.filteredPokemonList).toEqual([]);
        expect(result.current.txtSearchField).toEqual('');
    });

    it('should handles search input change', () => {
        const pokemonList = [
            { name: 'bulbasaur' },
            { name: 'charmander' },
        ];
        usePokemonSearch.mockReturnValue({
            filteredPokemonList: pokemonList,
            handleSearchChange: jest.fn(),
            txtSearchField: 'Pikachu',
        });
        const { result } = renderHook(() => usePokemonSearch());
        act(() => {
            result.current.handleSearchChange('Pikachu');
        });
        expect(result.current.txtSearchField).toBe('Pikachu');
        expect(result.current.filteredPokemonList.some(pokemon => pokemon.name === 'Pikachu')).toBe(false);
    });

    it('should render pockemon List', async () => {
        const { result } = renderHook(() => usePokemonSearch());
        await waitFor(() => {
            expect(result.current.filteredPokemonList).toEqual([
                { name: 'bulbasaur' },
                { name: 'charmander' },
            ]);
        }
        );
    });
});
