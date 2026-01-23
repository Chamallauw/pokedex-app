import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { TypeEffectivenessMap, TypeEffectivenessService } from '../../services/type-effectiveness.service'
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit {
  
  pokemons: Pokemon[] = [];
  loading: boolean = true;

  constructor(private pokemonService: PokemonService, 
    private typeEffectivenessService: TypeEffectivenessService,
    private readonly cdRef: ChangeDetectorRef,
    private router: Router) {}
  
  ngOnInit(): void {
    this.loadPokemons();
    this.test();
  }

  loadPokemons(): void {
    this.loading = true;

    this.pokemonService.getPokemonList().then(
      (pokemonList: Pokemon[]) => {
        this.pokemons = pokemonList;
        this.loading = false;

        this.cdRef.detectChanges();
      }
    );
  }

  test(): void {
    this.typeEffectivenessService.getAllTypeEffectiveness().then(
      (typeEffectivenessMap: TypeEffectivenessMap) => {
        console.log(typeEffectivenessMap);
      }
    )
  }

  selectPokemonDetail(pokemonId: number) {
    this.router.navigate(["/pokemon", pokemonId]);
  }

}
