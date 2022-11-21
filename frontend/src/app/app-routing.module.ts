import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';

const routes: Routes = [
  // { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'phone', loadChildren: () => import('./pages/phone/phone.module').then(m => m.PhoneModule) },
  { path: 'item-shop', component: ItemShopComponent},
  //{ path: '**', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'phone', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
