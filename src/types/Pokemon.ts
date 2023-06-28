export interface Pokemon {
    name: string;
    id: number;
    height: number;
    weight: number;
    types: Array<{ type: { name: string } }>
    moves: Array<{ move: { name: string } }>
    sprites: Array<{ sprites: string }>
    stats: Array<PokemonStats>
}

export type PartialPokemon = Pick<Pokemon, 'name' | 'id' | 'types' | 'sprites'>;

export interface PartialPokemonData {
    pokemon: PartialPokemon[];
}

export interface PokemonData {
    pokemon: Pokemon[];
}

export interface PokemonSprite {
    front_default: string;
}

export interface PokemonStats {
    stat: { 
        name: string,
        statistics: {
            info: {
                max: { value: number },
                min: { value: number },
                avg: { value: number }
            }
        }
    };
    value: number;
}