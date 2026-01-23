import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TypeEffectiveness } from '../models/type/type-effectiveness.model';

export type TypeEffectivenessMap = { [attackTypeId: number]: TypeEffectiveness }

@Injectable({
  providedIn: 'root',
})
export class TypeEffectivenessService {

  constructor(private readonly apollo: Apollo) {}
  
  async getAllTypeEffectiveness() : Promise<TypeEffectivenessMap> {
    let allTypeEffectiveness: TypeEffectivenessMap = {};

    await this.apollo.query({
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
    }).forEach((result: any) => {
      if (result.error) {
        throw new Error(result.error);
      }

      const typeEfficacies = result.data?.typeefficacy;

      for (let i=0; i<typeEfficacies.length; i++) {
        const typeEfficacy = typeEfficacies[i];

        const attackTypeId = typeEfficacy.attack_type.id;
        const targetTypeId = typeEfficacy.target_type_id;
        const damageFactor = typeEfficacy.damage_factor;

        if (!allTypeEffectiveness[attackTypeId]) {
          allTypeEffectiveness[attackTypeId] = new TypeEffectiveness(attackTypeId);
        }

        allTypeEffectiveness[attackTypeId].typeEffectivenessMap[targetTypeId] = damageFactor;
      }
    });

    return allTypeEffectiveness;
  }



}
