import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Pokemon } from '../models/pokemon/pokemon.model';
import { PokemonStat } from '../models/pokemon/pokemon-stat.model';
import { TypeEffectivenessService } from './type-effectiveness.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  constructor(private readonly apollo: Apollo,
    private readonly typeEffectivenessService: TypeEffectivenessService
  ) {}

  async getPokemonList() : Promise<Pokemon[]> {
    
    let pokemonList: Pokemon[] = [];

    const queryResult = await this.apollo.query<any>({
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
    }).toPromise();
    

    if (queryResult?.error) {
      throw queryResult?.error;
    }

    const pokemons = queryResult?.data.pokemons;

    for (let i=0; i<pokemons.length; i++) {
      const pokemon = this.parsePokemonFromApiResponse(pokemons[i]);

      if (pokemons[i].sprite[0].default) {
        pokemon.addSprite(pokemons[i].sprite[0].default);
      }

      pokemonList.push(pokemon);
    }

    return pokemonList;
  }

  async getPokemonDetail(pokemonId: number) : Promise<Pokemon> {

    let pokemon: Pokemon = new Pokemon("", 0);

    const queryResult = await this.apollo.query<any>({
      query: gql`
        {
          pokemons : pokemon(
            where:  {
              is_default:  {
                _eq: true
              }
              id:  {
                _eq: ${pokemonId}
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
                official_artwork: sprites (path: "other.official-artwork.front_default")
            }
            pokemonstats (
              order_by: {id: asc}
            ) {
              base_stat
              name: stat {
                  language: statnames (
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
          }
        }
      `
    }).toPromise();

    if (queryResult?.error) {
      throw queryResult?.error;
    }

    const pokemonData = queryResult?.data.pokemons[0];
    pokemon = this.parsePokemonFromApiResponse(pokemonData);

    const pokemonStatsData = pokemonData.pokemonstats;
    pokemon.setBaseStats(this.parsePokemonStatsFromApiResponse(pokemonStatsData));

    const pokemonTypeEffectiveness = await this.typeEffectivenessService.getPokemonTypeEffectiveness(pokemon.types);
    pokemon.effectivenessMap = pokemonTypeEffectiveness;

    if (pokemonData.sprite[0].official_artwork) {
      pokemon.addSprite(pokemonData.sprite[0].official_artwork);
    }

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

  private parsePokemonStatsFromApiResponse(statsData: any) : PokemonStat[] {
    let pokemonStats: PokemonStat[] = [];

    for (let i=0; i<statsData.length; i++) {
      pokemonStats.push(new PokemonStat(
        statsData[i].name.language[0]?.name,
        statsData[i].base_stat));
    }

    return pokemonStats;
  }
  
}
