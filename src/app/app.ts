import { Component, signal } from '@angular/core';
import { PokemonListComponent } from './components/pokemon-list.component/pokemon-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokedex-app');

}
