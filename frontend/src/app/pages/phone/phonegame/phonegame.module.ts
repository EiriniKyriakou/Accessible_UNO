import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneGameRoutingModule } from './phonegame-routing.module';
import { PhoneGameComponent } from './phonegame.component';
import { FormsModule }   from '@angular/forms';
import { CardComponent } from '../../card/card.component';


@NgModule({
  declarations: [PhoneGameComponent,CardComponent],
  imports: [
    CommonModule,
    PhoneGameRoutingModule,
    FormsModule
  ]
})
export class PhoneGameModule { }
