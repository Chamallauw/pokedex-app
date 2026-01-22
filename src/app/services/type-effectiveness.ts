import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class TypeEffectiveness {

  constructor(private readonly apollo: Apollo) {}
  
  async getTypeEffectiveness() : Promise<void> {

  }

}
