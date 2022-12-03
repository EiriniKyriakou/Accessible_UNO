import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneGameRoutingModule } from './phonegame-routing.module';
import { PhoneGameComponent } from './phonegame.component';
import { FormsModule }   from '@angular/forms';
import { CardComponent } from '../../card/card.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { PhoneModule } from '../phone.module';

@NgModule({
  declarations: [PhoneGameComponent,CardComponent],
  imports: [
    CommonModule,
    PhoneGameRoutingModule,
    FormsModule,
    PhoneModule
  ],
  // exports:[SidebarComponent]
})
export class PhoneGameModule { }
