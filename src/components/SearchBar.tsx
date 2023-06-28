import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components'

const Field = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px 0px 10px;
    width: 90%;
    height: 50px;
    border-radius: 50px;
    border-width: 1px;
    border-color: #3663AD;
    background-color: white;
`;

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 0px 5px 0px 5px;
`;

const SearchBar: React.FC<{ onSearch: (text: string) => void }> = ({ onSearch }) => {
  return (
    <Field>
        <Icon source={require("../res/lupa.png")}/>
        <TextInput
            style={{ flex: 1 }}
            onChangeText={onSearch}
        />
        <TouchableOpacity>
            <Icon source={require("../res/search.png")}/>
        </TouchableOpacity>
    </Field>
  )
}

export default SearchBar;