import { NgModule } from '@angular/core';
import { CardModel } from 'src/app/global/models/cards/card.model';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations:   [CardComponent],
    exports:        [CardComponent],
    imports: [CommonModule]
  })

export class CardModule {
 

}