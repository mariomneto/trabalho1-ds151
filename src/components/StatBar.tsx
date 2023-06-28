import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PokemonStats } from '../types/Pokemon'
import styled from 'styled-components'

const Background = styled.View`
    justify-content: flex-start;
    width: 140px;
    height: 8px;
    background-color: #E1E1E2;
    border-radius: 10px;
`;

const Bar = styled.View`
    width: ${(props: { pct: number }) => props.pct}%;
    height: 100%;
    background-color: ${(props: { color: string }) => props.color};
    border-radius: 10px;
`;

const StatBar: React.FC<PokemonStats & { color?: string }> = ({ stat, value, color }) => {
    const pct = (value / stat.statistics.info.max.value) * 100;
    const barColor = color ? color :
                        (value > stat.statistics.info.avg.value ? '#46C0A3' : '#E63950');
    return (
        <Background>
            <Bar pct={pct} color={barColor}/>
        </Background>
    )
}

export default StatBar