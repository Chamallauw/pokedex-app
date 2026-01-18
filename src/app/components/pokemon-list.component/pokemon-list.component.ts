import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
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

  constructor(private pokemonService: PokemonService, private readonly cdRef: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.loadPokemons();
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

}
