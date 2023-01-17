import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneGameRoutingModule } from './phonegame-routing.module';
import { PhoneGameComponent } from './phonegame.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../card/card.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { PhoneModule } from '../phone.module';
import { CardModule } from '../../card/card.module';

@NgModule({
  declarations: [PhoneGameComponent],
  imports: [
    CommonModule,
    PhoneGameRoutingModule,
    FormsModule,
    PhoneModule,
    CardModule,
  ],

})
export class PhoneGameModule {

}
