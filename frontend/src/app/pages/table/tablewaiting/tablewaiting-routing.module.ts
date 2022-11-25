import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableWaitingComponent } from './tablewaiting.component';

const routes: Routes = [
  { path: '', component: TableWaitingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableWaitingRoutingModule { }
