import { Injectable } from '@angular/core';
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = "https://graphql.pokeapi.co/v1beta2";
  private client = new ApolloClient({
    link: new HttpLink({ uri: this.apiUrl }),
    cache: new InMemoryCache(),
  });


  getPokemonList() {
    const pokemonList: Pokemon[] = [];

    this.client.query({
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
    }).then((result: any) => {
      if (result.error) {
        throw new Error(result.error);
      }

      const pokemons = result.data?.pokemons;

      for (let i=0; i<pokemons.length; i++) {
        const pokemonId = pokemons[i].id;
        const pokemonName = pokemons[i].pokemonspecy.pokemonspeciesnames[0]?.name;

        const pokemon = new Pokemon(pokemonName, pokemonId);

        const pokemonTypes = pokemons[i].types;
        for (let j=0; j<pokemonTypes.length; j++) {
          pokemon.addType(pokemonTypes[j].type.typenames[0]?.name);
        }

        if (pokemons[i].sprite[0].default) {
          pokemon.addSprite(pokemons[i].sprite[0].default);
        }

        pokemonList.push(pokemon);
      }

    });

    return pokemonList;
  }
  
}
