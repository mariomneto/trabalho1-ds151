import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache({
    addTypename: false
  })
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home" 
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ header: () => <Header/> }}
            />
            <Stack.Screen 
              name="Stats"
              component={StatsScreen}
              options={{ header: () => <Header backButton={true}/> }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;