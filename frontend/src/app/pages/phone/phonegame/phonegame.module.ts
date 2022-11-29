import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneGameRoutingModule } from './phonegame-routing.module';
import { PhoneGameComponent } from './phonegame.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [PhoneGameComponent],
  imports: [
    CommonModule,
    PhoneGameRoutingModule,
    FormsModule
  ]
})
export class PhoneGameModule { }
