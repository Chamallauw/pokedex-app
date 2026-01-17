import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('pokedex-app');

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.test();
  }

  test(): void {
    console.log(this.pokemonService.getPokemonList());
  }

}
