import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableGameComponent } from './tablegame.component';

const routes: Routes = [
  { path: '', component: TableGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableGameRoutingModule { }
