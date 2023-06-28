import { gql } from '@apollo/client';

const POKEMON_QUERY = gql`
    query Pokemon {
        pokemon: pokemon_v2_pokemon(limit: 12) {
            name
            id
            types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                    name
                }
            }
            sprites: pokemon_v2_pokemonsprites {
                sprites: sprites
            }
        }
    }
`

const POKEMON_NAME_QUERY = gql`
    query Pokemon($name: String!) {
        pokemon: pokemon_v2_pokemon(limit: 12, where: {name: {_regex: $name}}) {
            name
            id
            types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                    name
                }
            }
            sprites: pokemon_v2_pokemonsprites {
                sprites: sprites
            }
        }
    }
`

const STATS_QUERY = gql`
    query Stats($id: Int!) {
        pokemon: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
            name
            id
            height
            weight
            types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                    name
                }
            }
            moves: pokemon_v2_pokemonmoves(order_by: {pokemon_v2_move: {power: desc}}, where: {pokemon_v2_move: {power: {_is_null: false}}}, limit: 1) {
                move: pokemon_v2_move {
                    name
                }
            }
            stats: pokemon_v2_pokemonstats {
                stat: pokemon_v2_stat {
                    name
                    statistics: pokemon_v2_pokemonstats_aggregate {
                        info: aggregate {
                            max {
                                value: base_stat
                            }
                            min {
                                value: base_stat
                            }
                            avg {
                                value: base_stat
                            }
                        }
                    }
                }
                value: base_stat
            }
            sprites: pokemon_v2_pokemonsprites {
                sprites: sprites
            }
            pokemon_v2_pokemonspecy {
                gender_rate
                has_gender_differences
            }
        }
    }
`

export { POKEMON_QUERY, POKEMON_NAME_QUERY, STATS_QUERY };
