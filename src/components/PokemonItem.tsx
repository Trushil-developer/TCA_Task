import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - 30) / 2;

type PokemonItemProps = {
    name: string;
}

const PokemonItem = ({ name }: PokemonItemProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`,
                    }}
                />
                <Text style={styles.text}>{name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        padding: 5,
    },
    item: {
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        borderColor: '#F7CD46',
        borderWidth: 3,
    },
    text: {
        fontSize: 18,
        marginTop: 5,
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default PokemonItem;
