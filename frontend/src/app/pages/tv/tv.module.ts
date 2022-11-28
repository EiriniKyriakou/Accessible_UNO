import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TVComponent } from './tv.component';
import { TVRoutingModule } from './tv-routing.module';


@NgModule({
  declarations: [TVComponent],
  imports: [
    CommonModule,
    TVRoutingModule
  ]
})
export class TVModule { }
