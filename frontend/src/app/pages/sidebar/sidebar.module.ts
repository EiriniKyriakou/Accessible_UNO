import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent as SidebarComponent } from './sidebar.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ SidebarComponent],
  bootstrap:    [ SidebarComponent ]
})
export class SidebarModule { }
