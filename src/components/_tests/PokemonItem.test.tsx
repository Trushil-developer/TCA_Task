import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PokemonItem from '../PokemonItem';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe('PokemonItem', () => {
    it('should renders items correctly', () => {
        const { getByText, getByTestId } = render(<PokemonItem name="Pikachu" />);
        
        expect(getByText('Pikachu')).toBeTruthy();
        expect(getByTestId('pokemon-image')).toBeTruthy();
    });

    it('should navigates to details screen on press', () => {
        const navigate = jest.fn();
        useNavigation.mockReturnValue({ navigate });

        const { getByTestId } = render(<PokemonItem name="Pikachu" />);
        fireEvent.press(getByTestId('pokemon-item'));

        expect(navigate).toHaveBeenCalledWith('Details', { pokemon: 'Pikachu' });
    });
});
