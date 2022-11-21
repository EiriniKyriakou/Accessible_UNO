import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneComponent } from './phone.component';

const routes: Routes = [
  { path: '', component: PhoneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhoneRoutingModule { }
