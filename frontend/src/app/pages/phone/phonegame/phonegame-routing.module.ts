import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneGameComponent } from './phonegame.component';

const routes: Routes = [
  { path: '', component: PhoneGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhoneGameRoutingModule { }
