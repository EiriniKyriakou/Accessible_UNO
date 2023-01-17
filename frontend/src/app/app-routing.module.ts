import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { PhoneGameComponent } from './pages/phone/phonegame/phonegame.component';
import { TableComponent } from './pages/table/table.component';
import { TVComponent } from './pages/tv/tv.component';
import { WallComponent } from './pages/wall/wall.component';
import { TableWaitingComponent } from './pages/table/tablewaiting/tablewaiting.component';
import { TableGameComponent } from './pages/table/tablegame/tablegame.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'phone', loadChildren: () => import('./pages/phone/phone.module').then(m => m.PhoneModule) },
  { path: 'phonegame', loadChildren: () => import('./pages/phone/phonegame/phonegame.module').then(m => m.PhoneGameModule) },
  { path: 'table', loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule) },
  { path: 'tablewaiting', loadChildren: () => import('./pages/table/tablewaiting/tablewaiting.module').then(m => m.TableWaitingModule) },
  { path: 'tablegame', loadChildren: () => import('./pages/table/tablegame/tablegame.module').then(m => m.TableGameModule) },
  { path: 'tv', loadChildren: () => import('./pages/tv/tv.module').then(m => m.TVModule) },
  { path: 'wall', loadChildren: () => import('./pages/wall/wall.module').then(m => m.WallModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
