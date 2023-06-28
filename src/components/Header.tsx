import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const Body = styled.View`
  height: 140px;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 20px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: #21386E;
`;

const Arrow = styled.Image`
  width: 40px;
  height: 40px;
  margin-left: 20px;
`;

const Logo = styled.Image`
  width: 140px;
  height: 60px;
  object-fit: scale-down;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-70px);
`;

const Header: React.FC<{ backButton?: boolean }> = ({ backButton }) => {
  const navigation = useNavigation();
  return (
    <Body>
      {
        backButton &&
        <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
          <Arrow source={require('../res/back.png')} />
        </TouchableOpacity>
      }
      <Logo source={require('../res/pokemon.png')} />
    </Body>
  );
};

export default Header;