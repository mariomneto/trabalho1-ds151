import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components';
import { PartialPokemon, Pokemon } from '../types/Pokemon';
import { useNavigation } from '@react-navigation/native';
import { getPokemonSprite, treatId, treatText } from '../util/util';

const Card = styled.TouchableOpacity`
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;
    margin: 10px 10px 10px 10px;
    width: 40%;
    height: 200px;
    border-radius: 20px;
    background-color: #47D0B0;
`;

const IdTag = styled.View`
    background-color: #FFCB05;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 20px;
    height: 20px;
    width: 50px;
    top: -10px;
`;

const PokemonView = styled.View`
    background-color: #71E5C9;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 150px;
    margin-top: 10px;
`;

const PokemonSprite = styled.Image`
    width: 80%;
    height: 80%;
`;

const Title = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 5px;
`;

const TypeTag = styled.View`
    background-color: #46C0A3;
    justify-content: center;
    align-items: center;
    margin: 2px;
    padding: 0px 10px 0px 10px;
    border-radius: 24px;
    height: 24px;
`;

const PokeCard: React.FC<PartialPokemon> = ({ name, id, types, sprites }) => {
    const navigation = useNavigation();
    return (
        <Card
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Stats", { id })}
        >
            <IdTag>
                <Text>#{treatId(id)}</Text>
            </IdTag>
            <PokemonView>
                {sprites &&
                    <PokemonSprite source={{uri: getPokemonSprite(sprites)}}/>
                }
            </PokemonView>
           <View style={{ alignItems: 'center' }}>
                <Title>{treatText(name)}</Title>
                <View style={{ flexDirection: 'row' }}>
                    {types.map(t => (
                        <TypeTag key={t.type.name}>
                            <Text style={{ color: 'white' }}>{treatText(t.type.name)}</Text>
                        </TypeTag>
                    ))}
                </View>
           </View>
        </Card>
    )
}

export default PokeCard