import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native';
import { Pokemon, PokemonData, PokemonStats } from '../types/Pokemon';
import { useQuery } from '@apollo/client';
import { STATS_QUERY } from '../graphql/queries';
import { getPokemonSprite, treatId, treatText, VerticalMargin } from '../util/util';
import StatBar from '../components/StatBar';

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    margin: 30px 20px 100px 20px;
    border-radius: 20px;
    overflow: hidden;
`;

const Top = styled.View`
    flex: 1;
    background-color: #48D0B0;
    justify-content: center;
    padding-left: 52%;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const Bottom = styled.View`
    flex-grow: 4;
    background-color: #f3f3f3;
`;

const PokemonView = styled.View`
    position: absolute;
    justify-content: center;
    align-items: center;
    margin: 10px 0px 0px 20px;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background-color: #71E5C9;
`;

const PokemonSprite = styled.Image`
    width: 80%;
    height: 80%;
`;

const IdTag = styled.View`
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    height: 20px;
    width: 60px;
    background-color: #FFCB05;
`;

const Title = styled.Text`
    color: white;
    font-size: 25px;
    font-weight: 700;
`;

const TypeTag = styled.View`
    background-color: #46C0A3;
    justify-content: center;
    align-items: center;
    margin: 0px 2px 0px 4px;
    padding: 0px 10px 0px 10px;
    border-radius: 24px;
    height: 24px;
`;

const StatsTagContainer = styled.View`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

const StatsTag = styled.View`
    background-color: #46C0A3;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-top: 5px;
    padding: 3px 8px 3px 8px;
`;

const StatsTagText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;

const SmallText = styled.Text`
    color: #395BA7;
    font-size: 13px;
`;

const BigText = styled.Text`
    color: #21386E;
    font-size: 17px;    
`;

const BigTextBold = styled.Text`
    color: #21386E;
    font-size: 15px;
    font-weight: 500;
`;

const StatsContainerWrapper = styled.View`
    flex: 1;
    max-height: 50%;
    margin: 20px 5px 30px 5px;
`;

const StatsContainer = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin: 0px 20px 0px 20px;
`;

const StatsScreen = () => {
    const route = useRoute();
    const { id } = route.params;
    const [pokemon, setPokemon] = useState<Pokemon>();
    const { data } = useQuery<PokemonData>(STATS_QUERY,{
        variables: { id }
    });

    useEffect(() => {
      if(data?.pokemon) {
        setPokemon(data.pokemon[0]);
      }
    }, [data]);

    const getTotalStats = (): PokemonStats => {
        const totalValue = pokemon?.stats.reduce((prev, e) => {
            const pokemonTotal = prev.pokemonTotal + e.value;
            const avgTotal = prev.avgTotal + e.stat.statistics.info.avg.value;
            const maxTotal = prev.maxTotal + e.stat.statistics.info.max.value;
            return { pokemonTotal, avgTotal, maxTotal };
        }, { pokemonTotal: 0, maxTotal: 0, avgTotal: 0 });
        
        const totalStats = {
            value: totalValue?.pokemonTotal!,
            stat: {
                name: 'Total',
                statistics: {
                    info: {
                        max: { value: totalValue?.maxTotal! },
                        min: { value: 0 },
                        avg: { value: totalValue?.avgTotal! }
                    }
                }
            }            
        }
        return totalStats;
    }

    const totalStats = getTotalStats();

    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Container>
                <Top>
                    <IdTag>
                        <Text>#{treatId(id)}</Text>
                    </IdTag>
                    <VerticalMargin padding={5}>
                        <Title>{treatText(pokemon?.name)}</Title>
                    </VerticalMargin>
                    <View style={{ flexDirection: 'row' }}>
                        {pokemon?.types.map(t => (
                            <TypeTag key={t.type.name}>
                                <Text style={{ color: 'white' }}>{treatText(t.type.name)}</Text>
                            </TypeTag>
                        ))}
                    </View>
                </Top>
                <Bottom>
                    <VerticalMargin padding={25} paddingBottom={10}>
                        <View style={{ flexDirection: 'row' }}>
                            <StatsTagContainer>
                                <SmallText>Weight:</SmallText>
                                <StatsTag>
                                    <StatsTagText>{pokemon?.weight ? pokemon.weight / 10 : 0}kg</StatsTagText>
                                </StatsTag>
                            </StatsTagContainer>
                            <StatsTagContainer>
                                <SmallText>Height:</SmallText>
                                <StatsTag>
                                    <StatsTagText>{pokemon?.height ? pokemon.height / 10 : 0}m</StatsTagText>
                                </StatsTag>
                            </StatsTagContainer>
                            <StatsTagContainer>
                                <SmallText>Major Move:</SmallText>
                                <StatsTag>
                                    <StatsTagText>{treatText(pokemon?.moves[0].move.name)}</StatsTagText>
                                </StatsTag>
                            </StatsTagContainer>
                        </View>
                    </VerticalMargin>
                    
                    <StatsContainerWrapper>
                        {pokemon?.stats.map(s => (
                            <StatsContainer key={s.stat.name} style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-between', marginRight: 10}}>
                                    <BigTextBold>{treatText(s.stat.name)}</BigTextBold>
                                    <BigText>{s.value}</BigText>
                                </View>
                                <StatBar {...s}/>
                            </StatsContainer>
                        ))}
                            <StatsContainer style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-between', marginRight: 10}}>
                                    <BigTextBold>{totalStats.stat.name}</BigTextBold>
                                    <BigText>{totalStats.value}</BigText>
                                </View>
                                <StatBar 
                                    {...totalStats}
                                    color = {"#53E37E"}
                                />
                            </StatsContainer>
                    </StatsContainerWrapper>
                </Bottom>
                <PokemonView>
                    {pokemon?.sprites &&
                        <PokemonSprite source={{ uri: getPokemonSprite(pokemon?.sprites) }}/>
                    }
                </PokemonView>
            </Container>
        </View>
    )
}

export default StatsScreen
