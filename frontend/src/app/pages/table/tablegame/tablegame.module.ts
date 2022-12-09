import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../card/card.component';
import { TableGameRoutingModule } from './tablegame-routing.module';
import { TableComponent } from '../table.component';
import { TableGameComponent } from './tablegame.component';

@NgModule({
  declarations: [TableGameComponent,CardComponent],
  imports: [
    CommonModule,
    TableGameRoutingModule,
  ],
})

export class TableGameModule { }
