import { Component, Input as RouterInput } from '@angular/core';

@Component({
  selector: 'app-pokemon-detail.component',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent {
  @RouterInput() id!: number;
}
