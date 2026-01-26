import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TypeEffectiveness } from '../models/type/type-effectiveness.model';
import { Type } from '../models/type/type.model';

@Injectable({
  providedIn: 'root',
})
export class TypeEffectivenessService {

  constructor(private readonly apollo: Apollo) {}
  
   async getAllTypeEffectiveness() : Promise<Map<number, TypeEffectiveness>> {
    let allTypeEffectiveness: Map<number, TypeEffectiveness> = new Map();

    const queryResult = await this.apollo.query<any>({
      query: gql`
        {
          typeefficacy (
              order_by: {id: asc}
          ) {
              attack_type: type {
                id
              }
              target_type_id
              damage_factor
          }
        }
      `
    }).toPromise();

    if (queryResult?.error) {
      throw queryResult?.error;
    }

    const typeEfficacies = queryResult?.data.typeefficacy;

    for (let i=0; i<typeEfficacies.length; i++) {
      const typeEfficacy = typeEfficacies[i];

      const attackTypeId = typeEfficacy.attack_type.id;
      const targetTypeId = typeEfficacy.target_type_id;
      const damageFactor = typeEfficacy.damage_factor;

      if (!allTypeEffectiveness.get(attackTypeId)) {
        allTypeEffectiveness.set(attackTypeId, new TypeEffectiveness(attackTypeId));
      }

      allTypeEffectiveness.get(attackTypeId)?.typeEffectivenessMap.set(targetTypeId, damageFactor / 100);
    }

    return allTypeEffectiveness;
  }

  async getPokemonTypeEffectiveness(types: Type[]) : Promise<Map<number, number>> {
    let pokemonEffectivenessMap: Map<number, number> = new Map();
    let allTypeEffectiveness: Map<number, TypeEffectiveness> = await this.getAllTypeEffectiveness();

    for(let typeIndex=0; typeIndex<types.length; typeIndex++){
      const defendingTypeId = types[typeIndex].id;

      for (let type of allTypeEffectiveness.keys())  {
        const attackingTypeId = type;

        // initialize if not present in dictionary
        if (!pokemonEffectivenessMap.get(attackingTypeId)) {
          pokemonEffectivenessMap.set(attackingTypeId, 1);
        }

        const currentEffectiveness = pokemonEffectivenessMap.get(attackingTypeId) as number;
        const attackEffectiveness = allTypeEffectiveness.get(attackingTypeId)?.
                                      typeEffectivenessMap.get(defendingTypeId) as number;
        
        pokemonEffectivenessMap.set(attackingTypeId, currentEffectiveness * attackEffectiveness);
      }
    }

    return pokemonEffectivenessMap;
  }

}
