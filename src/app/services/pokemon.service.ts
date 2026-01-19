import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  constructor(private readonly apollo: Apollo) {}

  async getPokemonList() : Promise<Pokemon[]> {
    
    let pokemonList: Pokemon[] = [];

    await this.apollo.query({
      query: gql`
        {
          pokemons : pokemon(
            where:  {
                is_default:  {
                  _eq: true
                }
            }
            order_by: {id: asc}
          ) {
            id
            pokemonspecy {
                pokemonspeciesnames(
                  where:  {
                      language_id:  {
                        _eq: 5
                      }
                  }
                ) {
                  name
                }
            }
            types: pokemontypes (order_by: [ {
                id: asc
            }]) {
              type {
                typenames(
                  where:  {
                      language_id:  {
                        _eq: 5
                      }
                  }
                ) {
                  name
                }
              }
            }
            sprite: pokemonsprites {
                default: sprites (path: "front_default")
            }
          }
        }
      `
    }).forEach((result: any) => {
      if (result.error) {
        throw new Error(result.error);
      }

      const pokemons = result.data?.pokemons;

      for (let i=0; i<pokemons.length; i++) {
        const pokemon = this.parsePokemonFromApiResponse(pokemons[i]);

        if (pokemons[i].sprite[0].default) {
          pokemon.addSprite(pokemons[i].sprite[0].default);
        }

        pokemonList.push(pokemon);
      }
    });

    return pokemonList;
  }

  async getPokemonDetail() : Promise<Pokemon> {

    let pokemon: Pokemon = new Pokemon("", 0);

    await this.apollo.query({
      query: gql`
        {
          pokemons : pokemon(
            where:  {
                is_default:  {
                  _eq: true
                }
            }
            order_by: {id: asc}
          ) {
            id
            pokemonspecy {
                pokemonspeciesnames(
                  where:  {
                      language_id:  {
                        _eq: 5
                      }
                  }
                ) {
                  name
                }
            }
            types: pokemontypes (order_by: [ {
                id: asc
            }]) {
              type {
                typenames(
                  where:  {
                      language_id:  {
                        _eq: 5
                      }
                  }
                ) {
                  name
                }
              }
            }
            sprite: pokemonsprites {
                default: sprites (path: "front_default")
            }
          }
        }
      `
    }).forEach((result: any) => {
      if (result.error) {
        throw new Error(result.error);
      }

      const pokemonData = result.data?.pokemon[0];
      pokemon = this.parsePokemonFromApiResponse(pokemonData);

      if (pokemonData.sprite[0].default) {
        pokemon.addSprite(pokemonData.sprite[0].default);
      }
    });

    return pokemon;
  }


  private parsePokemonFromApiResponse(data: any) : Pokemon {
    const pokemonId = data.id;
    const pokemonName = data.pokemonspecy.pokemonspeciesnames[0]?.name;

    const pokemon = new Pokemon(pokemonName, pokemonId);

    const pokemonTypes = data.types;
    for (let j=0; j<pokemonTypes.length; j++) {
      pokemon.addType(pokemonTypes[j].type.typenames[0]?.name);
    }

    return pokemon;
  }
  
}
