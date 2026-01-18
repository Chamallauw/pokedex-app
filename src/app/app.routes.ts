import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail.component/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list.component/pokemon-list.component';

export const routes: Routes = [
    {path: 'pokemon/:id', component: PokemonDetailComponent},
    {path: '', component: PokemonListComponent}
];
