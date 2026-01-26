import { Component, Input as RouterInput, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon/pokemon.model';
import { PokemonStat } from '../../models/pokemon/pokemon-stat.model';

import localeForNumberFormat from '@angular/common/locales/ca-FR';
import { Type } from '../../models/type/type.model';
registerLocaleData(localeForNumberFormat);

@Component({
  selector: 'app-pokemon-detail.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent implements OnInit{
  @RouterInput() id!: number;
 
  pokemon: Pokemon | undefined = undefined;
  loading: boolean = true;

  constructor(private pokemonService: PokemonService, 
    private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadPokemonDetail();
  }

  loadPokemonDetail(): void {
    this.loading = true;

    this.pokemonService.getPokemonDetail(this.id).then(
      (pokemon: Pokemon) => {
        this.pokemon = pokemon;
        this.loading = false;

        console.log(this.pokemon.effectivenessMap);

        this.cdRef.detectChanges();
      }
    );
  }

  getMinStatValue() : number {
    return PokemonStat.MIN_VALUE;
  }

  getMaxStatValue() : number {
    return PokemonStat.MAX_VALUE;
  }

  getTypeFromTypeId(typeId : number) : Type {
    return Type.getTypeById(typeId);
  }

}
