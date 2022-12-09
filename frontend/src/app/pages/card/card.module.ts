import { NgModule } from '@angular/core';
import { CardModel } from 'src/app/global/models/cards/card.model';
import { CardComponent } from './card.component';

@NgModule({
    declarations:   [CardComponent],
    exports:        [CardComponent]
  })

export class CardModule {
 

}