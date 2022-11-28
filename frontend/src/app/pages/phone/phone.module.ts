import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneRoutingModule } from './phone-routing.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PhoneComponent } from './phone.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [PhoneComponent, SidebarComponent],
  imports: [
    CommonModule,
    PhoneRoutingModule,
    FormsModule
  ]
})
export class PhoneModule { }
